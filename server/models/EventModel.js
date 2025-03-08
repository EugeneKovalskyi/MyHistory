const createEvent = require('../services/EventModel/createEvent')
const getEvents = require('../services/EventModel/getEvents')
const getPhoto = require('../services/EventModel/getPhoto')
const updateEvent = require('../services/EventModel/updateEvent')
const deleteEvent = require('../services/EventModel/deleteEvent')

const EventModel = {
	createEvent,
	getEvents,
	getPhoto,
	updateEvent,
	deleteEvent
}

module.exports = EventModel