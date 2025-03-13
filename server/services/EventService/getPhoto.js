const pgf = require('pg-format')
const fsPromises = require('fs/promises')

const db = require('../../db/db')

async function getPhoto(photoId) {
	const photoPath = ( await db.query( pgf( `
		SELECT path FROM photos WHERE id = %L`,
		photoId
	))).rows[0].path
	const photo = fsPromises.readFile(photoPath)

	return photo
}

module.exports = getPhoto