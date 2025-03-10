const pgf = require('pg-format')
const fsPromise = require('fs/promises')
const { join } = require('path')
const { existsSync } = require('fs')
const db = require('../../db/db')

async function deleteEvent(eventId, userId) {
	const dirPath = join(process.env.PHOTOS_PATH, userId, eventId)

	if (existsSync(dirPath)) {
		await fsPromise.rm(dirPath, { recursive: true })
	}

	await db.query( pgf( `
		DELETE FROM events WHERE id = %L;`,
		eventId
	))
}

module.exports = deleteEvent