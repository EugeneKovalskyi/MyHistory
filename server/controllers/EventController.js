const busboy = require('busboy')

const tempErrorHandler = require('../middleware/tempErrorHandler')
const eventModel = require('../models/EventModel')
const parseUrl = require('../middleware/parseUrl')

class EventController {

  async post(req, res) {
    const userId = parseUrl(req.url).searchParams.get('userId')
    const bb = busboy({ headers: req.headers })
    const event = { photos: [] }
    const buffers = {}

    bb.on('error', tempErrorHandler)
    bb.on('file', (id, file) => handleFile(id, file, buffers))
    bb.on('field', (name, value) => handlePostField(name, value, event))
    bb.on('finish', async () => {
      attachBuffersToPhotos(event.photos, buffers)
      const ids = await eventModel.createEvent(event, userId)
      
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
      const events = await eventModel.getEvents(userId, userLocale)

      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.write(JSON.stringify(events))

    } else if (photoId) {
      const photo = await eventModel.getPhoto(photoId)

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
    bb.on('field', (name, value) => handelPatchField(name, value, dataToUpdate))
    bb.on('finish', async () => {
      attachBuffersToPhotos(dataToUpdate.photosToInsert, buffers)
      const photosIds = await eventModel.updateEvent(dataToUpdate, eventId, userId)

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(photosIds))
    })

    req.pipe(bb)
  }

  async delete(req, res) {
    const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const eventId = params.get('eventId')

    await eventModel.deleteEvent(eventId, userId)

    res.statusCode = 204
    res.end()
  }
}

module.exports = new EventController()


function handleFile(id, file, buffers) {
  const chunks = []

  file.on('error', tempErrorHandler)
  file.on('data', chunk => chunks.push(chunk))
  file.on('end', () => buffers[id] = Buffer.concat(chunks))
}

function handlePostField(name, value, event) {
  if (name === 'photos') 
    event.photos.push(JSON.parse(value))
  else 
    event[name] = value
}

function handelPatchField(name, value, dataToUpdate) {
  switch (name) {
    case 'photosToInsert':
      dataToUpdate[name].push(JSON.parse(value)) 
      break

    case 'photosToDelete':
      dataToUpdate[name] = JSON.parse(value)
      break

    default:
      dataToUpdate[name] = value
  }
}

function attachBuffersToPhotos(photos, buffers) {
  for (const photo of photos) {
    photo.buffer = buffers[photo.id]
  }
}