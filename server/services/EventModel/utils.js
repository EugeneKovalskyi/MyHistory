const pgf = require('pg-format')
const fsPromise = require('fs/promises')
const { join } = require('path')

const db = require('../../db/db')

async function addPhotos(photos, eventId, userId) {
	const photosPath = process.env.PHOTOS_PATH
	const eventPhotosPath = join(photosPath, userId, eventId)
	const photosIds = {}

	await fsPromise.mkdir(eventPhotosPath, { recursive: true })

	for (const photo of photos) {
		const ext = photo.name.match(/\.[^.]+$/)[0]
		const photoName = crypto.randomUUID() + ext
		const photoPath = join(eventPhotosPath, photoName)
		const photoId = await insertPhotos(photo, photoPath, eventId)

		await fsPromise.writeFile(photoPath, photo.buffer)
		photosIds[photo.id] = photoId
	}

	return photosIds
}

module.exports = { addPhotos }


async function insertPhotos(photo, photoPath, eventId) {
	const queryResult = await db.query( pgf( `
		INSERT INTO photos (path, width, height, event_id)
		VALUES (%L)
		RETURNING id;`,
		[photoPath, photo.width, photo.height, eventId]
	))

	return queryResult.rows[0].id
}