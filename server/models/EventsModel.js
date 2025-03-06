const pgf = require('pg-format')
const path = require('path')
const fsPromise = require('fs/promises')

const db = require('../db/db')
const formatDate = require('../middleware/formatDate')

class EventsModel {

	async createEvent(event, userId) {
		const tagsArray = event.tags.length && event.tags.split(' ') 
		const eventId = ( await db.query( pgf( `
			INSERT INTO events (title, date, description, user_id)
			VALUES (%L)
			RETURNING id;`,
			[event.title, event.date, event.description, userId]
		))).rows[0].id
		let photosIds = null

		if (event.photos.length)
			photosIds = await this._insertPhotos(event.photos, userId, eventId)

		if (tagsArray) {
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
		
		return {
			eventId,
			photosIds
		}
	}

	async getEvents(userId, userLocale) {
		const events = ( await db.query( pgf( `
			SELECT events.id, events.title, events.date, events.description, 
			string_agg(tags.name, ' ') AS tags FROM events
			LEFT JOIN events_tags ON events_tags.event_id = events.id 
			LEFT JOIN tags ON tags.name = events_tags.tag_name
			WHERE events.user_id = %L
			GROUP BY events.id;`, 
			userId
		))).rows

		for (const event of events) {
			const photos = ( await db.query( pgf( `
				SELECT id, width, height FROM photos
				WHERE event_id = %L;`,
				event.id
			))).rows

			event.photos = []

			for (const photo of photos) {
				event.photos.push({
					id: photo.id,
					name: event.title,
					src: `${process.env.SERVER_DOMAIN}/events/photos?photoId=${photo.id}`,
					width: photo.width,
					height: photo.height,
				})
			}
		}

		for (const event of events) {
      event.date = formatDate(event.date, userLocale)
    }
			
		return events
	}

	async getPhoto(photoId) {
		const photoPath = ( await db.query( pgf( `
			SELECT path FROM photos WHERE id = %L`,
			photoId
		))).rows[0].path

		const photo = fsPromise.readFile(photoPath)

		return photo
	}

	async updateEvent(dataToUpdate, userId, eventId) {
		let photosIds = null

		for (const field in dataToUpdate) {
			if (field === 'tags') {
				const tagsToUpdate = dataToUpdate[field].length && dataToUpdate[field].split(' ') 
				const currentTags = ( await db.query( pgf( `
					SELECT tag_name AS name FROM events_tags WHERE event_id = %L;`,
					eventId
				))).rows.map(tag => tag.name)

				if (!tagsToUpdate) {
					await db.query( pgf( `
						DELETE FROM events_tags WHERE event_id = %L`, 
						eventId))
					
					continue
				} 

				await db.query( pgf( `
					INSERT INTO tags (name)
					VALUES %L
					ON CONFLICT (name) DO NOTHING;`,
					tagsToUpdate.map(tag => [tag])
				))

				for (const tag of currentTags) {
					if (!tagsToUpdate.includes(tag)) {
						await db.query( pgf( `
							DELETE FROM events_tags WHERE tag_name = %L;`,
							tag
						))
					}
				}

				for (const tag of tagsToUpdate) {
					if (!currentTags.includes(tag)) {
						await db.query( pgf( `
							INSERT INTO events_tags (event_id, tag_name)
							VALUES (%L);`,
							[eventId, tag]
						))
					}
				}

			} else if (field === 'photosToInsert') {
				if (dataToUpdate[field].length)
					photosIds = await this._insertPhotos(dataToUpdate[field], userId, eventId)

			} else if (field === 'photosToDelete') {
				for (const photoId of dataToUpdate[field]) {
					const photoPath = ( await db.query( pgf( `
						SELECT path FROM photos WHERE id = %L;`,
						photoId
					))).rows[0].path

					await fsPromise.rm(photoPath)
					await db.query( pgf( `
						DELETE FROM photos WHERE id = %L;`,
						photoId
					))
				}

			} else {
				await db.query( pgf( `
					UPDATE events SET %I = %L WHERE events.id = %L;`,
					field, dataToUpdate[field], eventId
				))
			}
		}

		return photosIds
	}

	async deleteEvent(userId, eventId) {
		const dirPath = path.join(process.env.PHOTOS_PATH, userId, eventId)

		await fsPromise.rm(dirPath, { recursive: true })
		await db.query( pgf( `
			DELETE FROM events WHERE id = %L;`,
			eventId
		))
	}

	async _insertPhotos(photos, userId, eventId) {
		const photosPath = process.env.PHOTOS_PATH
		const eventPhotosPath = path.join(photosPath, userId, eventId)
		const photosIds = {}
	
		await fsPromise.mkdir(eventPhotosPath, { recursive: true })
	
		for (const photo of photos) {
			const ext = photo.name.match(/\.[^.]+$/)[0]
			const photoName = crypto.randomUUID() + ext
			const photoPath = path.join(eventPhotosPath, photoName)
			const photoId = ( await db.query( pgf( `
					INSERT INTO photos (path, width, height, event_id)
					VALUES (%L)
					RETURNING id;`,
					[photoPath, photo.width, photo.height, eventId]
			))).rows[0].id
	
			await fsPromise.writeFile(photoPath, photo.buffer)
			photosIds[photo.id] = photoId
		}
	
		return photosIds
	}
}

module.exports = new EventsModel()