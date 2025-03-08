const pgf = require('pg-format')
const db = require('../../db/db')
const { addPhotos } = require('./utils')

async function createEvent(event, userId) {
	const tagsArray = event.tags.length && event.tags.split(' ') 
	const eventId = await insertEvent(event, userId)
	let photosIds = null

	if (event.photos.length)
		photosIds = await addPhotos(event.photos, eventId, userId)

	if (tagsArray)
		await insertTags(tagsArray, eventId) 
	
	return { eventId, photosIds }
}

module.exports = createEvent


async function insertEvent(event, userId) {
	const queryResult = await db.query( pgf( `
		INSERT INTO events (title, date, description, user_id)
		VALUES (%L)
		RETURNING id;`,
		[event.title, event.date, event.description, userId]
	))

	return queryResult.rows[0].id
}

async function insertTags(tagsArray, eventId) {
	await db.query( pgf( `
		INSERT INTO tags (name)
		VALUES %L
		ON CONFLICT (name) DO NOTHING;`,
		tagsArray.map(tag => [tag])
	))

	await db.query( pgf( `
		INSERT INTO events_tags (event_id, tag_name)
		VALUES %L;`, 
		tagsArray.map(tag => [eventId, tag])
	))
}