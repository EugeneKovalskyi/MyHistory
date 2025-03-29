const pgf = require('pg-format')
const fsPromises = require('fs/promises')
const { existsSync } = require('fs')
const path = require('path')
const db = require('#db')

async function deleteEvent(eventId, userId) {
	const dirPath = path.join(process.env.PHOTOS_PATH, userId, eventId)

	if (existsSync(dirPath)) {
		await fsPromises.rm(dirPath, { recursive: true })
	}

	await db.query( pgf( `
		DELETE FROM events WHERE id = %L;`,
		eventId
	))
}

module.exports = deleteEvent