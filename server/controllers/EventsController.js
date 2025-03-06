const busboy = require('busboy')

const tempErrorHandler = require('../middleware/tempErrorHandler')
const eventsModel = require('../models/EventsModel')
const parseUrl = require('../middleware/parseUrl')

class EventsController {

  async post(req, res) {
    const userId = parseUrl(req.url).searchParams.get('userId')
    const bb = busboy({ headers: req.headers })
    const event = { photos: [] }
    const buffers = {}

    bb.on('error', tempErrorHandler)
    bb.on('file', (id, file) => handleFile(id, file, buffers))
    bb.on('field', (name, value) => {
      if (name === 'photos') {
        event.photos.push(JSON.parse(value))
      } else event[name] = value
    })
    bb.on('finish', async () => {
      for (const photo of event.photos) {
        photo.buffer = buffers[photo.id]
      }

      const ids = await eventsModel.createEvent(event, userId)
      
      res.writeHead(201, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(ids)) 
    })

    req.pipe(bb)
  }

  async get(req, res) {
    const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const photoId = params.get('photoId')
    
    if (userId) {
      const userLocale = req.headers['accept-language'].match(/^[a-z]+-[A-Z]+/)[0]
      const events = await eventsModel.getEvents(userId, userLocale)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(events))

    } else if (photoId) {
      const photo = await eventsModel.getPhoto(photoId)

      res.writeHead(200, { 'Content-Type': 'image/*' })
      res.write(photo)

    } else {
      //! Сделать redirect
      console.warn(`Запрос ${req.url} не обрабатывается!`)
    }

    res.end()
  }

  async patch(req, res) {
    const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const eventId = params.get('eventId')
    const bb = busboy({ headers: req.headers })
    const dataToUpdate = { photosToInsert: [] }
    const buffers = {}

    bb.on('error', tempErrorHandler)
    bb.on('file', (id, file) => handleFile(id, file, buffers))
    bb.on('field', (name, value) => {
      if (name === 'photosToInsert') {
        dataToUpdate[name].push(JSON.parse(value)) 
      } else if (name === 'photosToDelete') {
        dataToUpdate[name] = JSON.parse(value)
      } else {
        dataToUpdate[name] = value
      }
    })
    bb.on('finish', async () => {
      for (const photo of dataToUpdate.photosToInsert) {
        photo.buffer = buffers[photo.id]
      }

      const photosIds = await eventsModel.updateEvent(dataToUpdate, userId, eventId)

      if (photosIds) {
        res.writeHead(200, {
          'Content-Type': 'application/json',
        })
        res.end(JSON.stringify(photosIds))
      } else {
        res.statusCode = 204
        res.end()
      }
    })

    req.pipe(bb)
  }

  async delete(req, res) {
    const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const eventId = params.get('eventId')
    
    await eventsModel.deleteEvent(userId, eventId)

    res.statusCode = 204
    res.end()
  }
}

module.exports = new EventsController()

function handleFile(id, file, buffers) {
  const chunks = []

  file.on('error', tempErrorHandler)
  file.on('data', chunk => chunks.push(chunk))
  file.on('end', () => buffers[id] = Buffer.concat(chunks))
}