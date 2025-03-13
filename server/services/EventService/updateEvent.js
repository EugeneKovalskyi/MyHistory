const pgf = require('pg-format')
const fsPromises = require('fs/promises')

const db = require('../../db/db')
const { addPhotos } = require('./utils')

async function updateEvent(dataToUpdate, eventId, userId) {
	let photosIds = null

	for (const name in dataToUpdate) {
		switch(name) {
			case 'tags': 
				await manageTags(dataToUpdate[name], eventId)
				break

			case 'photosToInsert':
				if (dataToUpdate[name].length)	{
					photosIds = await addPhotos(dataToUpdate[name], eventId, userId)
				}
				break

			case 'photosToDelete':
				await deletePhotos(dataToUpdate[name])
				break

			default:
				await update(name, dataToUpdate[name], eventId)
		}
	}
	
	return photosIds
}

module.exports = updateEvent


async function manageTags(tagsToUpdate, eventId) {
	const newTags = tagsToUpdate && tagsToUpdate.split(' ') 
	const oldTags = await selectTags(eventId)

	if (newTags) await insertTags(newTags)

	for (const tag of newTags)
		if (!oldTags.includes(tag)) await addEventTagRelation(tag, eventId)
	
	for (const tag of oldTags)
		if (!newTags?.includes(tag)) deleteEventTagRelation(tag)
}

// Запросы
async function selectTags(eventId) {
	const queryResult = await db.query( pgf( `
		SELECT tag_name AS name FROM events_tags WHERE event_id = %L;`,
		eventId
	))

	return queryResult.rows.map(tag => tag.name)
}

async function insertTags(tags) {
	await db.query( pgf( `
		INSERT INTO tags (name)
		VALUES %L
		ON CONFLICT (name) DO NOTHING;`,
		tags.map(tag => [tag])
	))
}

async function addEventTagRelation(tag, eventId) {
	await db.query( pgf( `
		INSERT INTO events_tags (event_id, tag_name)
		VALUES (%L);`,
		[eventId, tag]
	))
}

async function deleteEventTagRelation(tag) {
	await db.query( pgf( `
		DELETE FROM events_tags WHERE tag_name = %L;`,
		tag
	))
}

async function deletePhotos(photosIds) {
	for (const photoId of photosIds) {
		const photoPath = ( await db.query( pgf( `
			SELECT path FROM photos WHERE id = %L;`,
			photoId
		))).rows[0].path

		await fsPromises.rm(photoPath)
		await db.query( pgf( `
			DELETE FROM photos WHERE id = %L;`,
			photoId
		))
	}
}

async function update(name, value, eventId) {
	await db.query( pgf( `
		UPDATE events SET %I = %L WHERE events.id = %L;`,
		name, value, eventId
	))
}