const userLogin = 'eugenekovalskyi'

const eventsModel = require('../models/EventsModel')

class EventsController {
  async post(req, res, userId) {
    const receivedBuffers = []
  
    req.on('error', (error) => console.log(error))
    req.on('data', (chunk) => receivedBuffers.push(chunk))
    req.on('end', async () => {
      if (receivedBuffers.length) {
        const event = JSON.parse(Buffer.concat(receivedBuffers).toString())
        const eventId = await eventsModel.createEvent(event, userId)

        res.writeHead(201, {
          'Content-Type': 'text/plain'
        })
        res.write(eventId)
        res.end()
      }
    })
  }
  
  async get(res, userId) {
    const events = await eventsModel.getEvents(userId)

    res.writeHead(200, {
      'Content-Type': 'application/json',
    })
    res.write(JSON.stringify(events))
    res.end()
  }
  
  async patch(req, res, eventId) {
    const receivedBuffers = []
    
    req.on('error', (error) => console.log(error))
    req.on('data', (chunk) => receivedBuffers.push(chunk))
    req.on('end', async () => {
      const dataToUpdate = JSON.parse(Buffer.concat(receivedBuffers).toString())

      await eventsModel.updateEvent(dataToUpdate, eventId)
      
      res.statusCode = 204
      res.end()
    })
  }
  
  async delete(res, eventId) {
    await eventsModel.deleteEvent(eventId)

    res.statusCode = 204
    res.end()
  }
}

module.exports = new EventsController()

