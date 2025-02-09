const pgf = require('pg-format')
const db = require('../db/db')

class EventsModel {
	async createEvent(event, userId) {
		const tagsArray = event.tags.split(' ')
		
		const eventId = ( await db.query( pgf( `
			INSERT INTO events (title, date, description, user_id)
			VALUES (%L)
			RETURNING id;`,
			[event.title, event.date, event.description, userId]
		))).rows[0].id

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

		return eventId
	}

	async getEvents(userId) {
		const events = ( await db.query( pgf( `
			SELECT events.id, events.title, events.date, events.description, 
			string_agg(tags.name, ' ') AS tags FROM events_tags
			JOIN events ON events.id = events_tags.event_id
			JOIN tags ON tags.name = events_tags.tag_name
			WHERE events.user_id = %L
			GROUP BY events.id;`, 
			userId
		)))

		return events.rows
	}

	async updateEvent(dataToUpdate, eventId) {
		for (let field in dataToUpdate) {
			if (field === 'tags') {
				const tagsToUpdate = dataToUpdate[field].split(' ')           
				
				const currentTags = ( await db.query( pgf( `
					SELECT tag_name AS name FROM events_tags WHERE event_id = %L;`,
					eventId
				))).rows.map(tag => tag.name)

				await db.query( pgf( `
					INSERT INTO tags (name)
					VALUES %L
					ON CONFLICT (name) DO NOTHING;`,
					tagsToUpdate.map(tag => [tag])
				))

				for(let tag of currentTags) {
					if (!tagsToUpdate.includes(tag)) {
						await db.query( pgf( `
							DELETE FROM events_tags WHERE tag_name = %L;`,
							tag
						))
					}
				}

				for (let tag of tagsToUpdate) {
					if (!currentTags.includes(tag)) {
						await db.query( pgf( `
							INSERT INTO events_tags (event_id, tag_name)
							VALUES (%L);`,
							[eventId, tag]
						))
					}
				}
			} else {
				await db.query( pgf( `
					UPDATE events SET %I = %L WHERE events.id = %L;`,
					field, dataToUpdate[field], eventId
				))
			}
		}
	}

	async deleteEvent(eventId) {
		await db.query( pgf( `
			DELETE FROM events WHERE id = %L;`,
			eventId
		))
	}
}

module.exports = new EventsModel()