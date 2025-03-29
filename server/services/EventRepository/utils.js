const pgf = require('pg-format')
const fsPromises = require('fs/promises')
const path = require('path')
const crypto = require('crypto')

const db = require('#db')

async function addPhotos(photos, eventId, userId) {
	const photosPath = process.env.PHOTOS_PATH
	const eventPhotosPath = path.join(photosPath, userId, eventId)
	const photosIds = {}

	await fsPromises.mkdir(eventPhotosPath, { recursive: true })

	for (const photo of photos) {
		const ext = photo.name.match(/\.[^.]+$/)[0]
		const photoName = crypto.randomUUID() + ext
		
		photo.path = path.join(eventPhotosPath, photoName)
		photosIds[photo.id] = await insertPhoto(photo, eventId)
		await fsPromises.writeFile(photo.path, photo.buffer)
	}

	return photosIds
}

module.exports = { addPhotos }

// Запросы
async function insertPhoto(photo, eventId) {
	const queryResult = await db.query( pgf( `
		INSERT INTO photos (path, width, height, event_id)
		VALUES (%L)
		RETURNING id;`,
		[photo.path, photo.width, photo.height, eventId]
	))

	return queryResult.rows[0].id
}