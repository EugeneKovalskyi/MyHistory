const pgf = require('pg-format')
const db = require('../../db/db')
const formatDate = require('../../middleware/formatDate')

async function getEvents(userId, userLocale) {
	const events = await selectEvents(userId)

	for (const event of events)
		event.date = formatDate(event.date, userLocale)

	for (const event of events) {
		event.photos = await selectPhotos(event.id)

		event.photos.forEach((photo, index) => {
			photo.name = event.title + index,
			photo.src = `${process.env.SERVER_DOMAIN}/events/photos?photoId=${photo.id}`
		})
	}

	return events
}

module.exports = getEvents 


async function selectEvents(userId) {
	const queryResult = await db.query( pgf( `
		SELECT events.id, events.title, events.date, events.description, 
		string_agg(tags.name, ' ') AS tags FROM events
		LEFT JOIN events_tags ON events_tags.event_id = events.id 
		LEFT JOIN tags ON tags.name = events_tags.tag_name
		WHERE events.user_id = %L
		GROUP BY events.id;`, 
		userId
	))

	return queryResult.rows
}

async function selectPhotos(eventId) {
	const queryResult = await db.query( pgf( `
		SELECT id, width, height FROM photos
		WHERE event_id = %L;`,
		eventId
	))

	return queryResult.rows
}