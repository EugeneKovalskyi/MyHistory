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
    bb.on('field', (name, value) => {
      if (name === 'photos') {
        event.photos.push(JSON.parse(value))
      } else event[name] = value
    })
    bb.on('file', (id, file) => {
      const chunks = []

      file.on('error', tempErrorHandler)
      file.on('data', chunk => chunks.push(chunk))
      file.on('end', () => buffers[id] = Buffer.concat(chunks))
    })
    bb.on('finish', async () => {
      for (let photo of event.photos) {
        photo.buffer = buffers[photo.id]
      }

      const eventId = await eventsModel.createEvent(event, userId)

      res.write(JSON.stringify(eventId))
    })

    req.pipe(bb)
    res.writeHead(201, {
      'Content-Type': 'text/plain',
    })
    res.end() 
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

  async getPhotos(req, res) {
    console.log(req.headers)
  }

  async patch(req, res) {
    const eventId = parseUrl(req.url).searchParams.get('eventId')
    const chunks = []

    req.on('error', tempErrorHandler)
    req.on('data', chunk => chunks.push(chunk))
    req.on('end', async () => {
      const dataToUpdate = JSON.parse(Buffer.concat(chunks).toString())
      await eventsModel.updateEvent(dataToUpdate, eventId)

      res.statusCode = 204
      res.end()
    })
  }

  async delete(req, res) {
    const eventId = parseUrl(req.url).searchParams.get('eventId')
    await eventsModel.deleteEvent(eventId)

    res.statusCode = 204
    res.end()
  }
}

module.exports = new EventsController()

