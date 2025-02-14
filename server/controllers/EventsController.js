const eventsModel = require('../models/EventsModel')
const parseUrl = require('../middleware/parseUrl')
const formatDate = require('../middleware/formatDate')

class EventsController {
  async post(req, res) {
    const userId = parseUrl(req.url).searchParams.get('userId')
    const chunks = []
  
    req.on('error', (error) => console.log(error))
    req.on('data', (chunk) => chunks.push(chunk))
    req.on('end', async () => {
      if (chunks.length) {
        const event = JSON.parse(Buffer.concat(chunks).toString())
        const eventId = await eventsModel.createEvent(event, userId)

        res.writeHead(201, {
          'Content-Type': 'text/plain'
        })
        res.write(eventId)
      }
      
      res.end()
    })
  }
  
  async get(req, res) {
    const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const userLocale = params.get('userLocale')
    const events = await eventsModel.getEvents(userId)

    for (let event of events) {
      event.date = formatDate(event.date, userLocale)
    }

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.write(JSON.stringify(events))
    res.end()
  }
  
  async patch(req, res) {
    const eventId = parseUrl(req.url).searchParams.get('eventId')
    const chunks = []
    
    req.on('error', (error) => console.log(error))
    req.on('data', (chunk) => chunks.push(chunk))
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

