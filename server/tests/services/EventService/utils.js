const fsPromises = require('fs/promises')
const db = require('../../../db/db')

async function getTestDBData(eventId) {
	const event = (await db.query(`
		SELECT * FROM events WHERE id = $1`,
		[eventId])).rows[0]

	const tags = (await db.query(`
		SELECT tag_name AS name FROM events_tags WHERE event_id = $1`, 
		[eventId])).rows.map(tag => tag.name)

	const photos = (await db.query(`
		SELECT * FROM photos WHERE event_id = $1`,
		[eventId])).rows

	return { event, tags, photos }
}

async function clearTestDB(userId, userPhotosPath){
	await fsPromises.rm(userPhotosPath, { recursive: true })
	await db.query('DELETE FROM events WHERE user_id = $1', [userId])
	db.end()
}

module.exports = {
	getTestDBData,
	clearTestDB,
}
