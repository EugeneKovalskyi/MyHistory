const { getType } = require('jest-get-type')
const db = require('../db/db')
const eventsModel = require('../models/EventModel')

afterAll(async () => {
	await db.query('DELETE FROM events WHERE user_id = 1')
	db.end()
})

describe('EventsModel', () => {
	let eventId = null
	const userId = 1
	const eventToCreate = {
		title: 'Created title',
		date: '09.05.1945',
		description: 'Created description',
		tags: 'created tag'
	}
	const eventToUpdate = {
		title: 'Updated title',
		date: '11.11.1111',
		description: 'Updated description',
		tags: 'updated tag'
	}

	test('createEvent', async () => {
		eventId = await eventsModel.createEvent(eventToCreate, userId)

		const createdEvent = (await db.query(`
			SELECT * FROM events WHERE id = $1`, 
			[eventId])).rows[0]

		const tags = (await db.query(`
			SELECT tag_name AS name FROM events_tags WHERE event_id = $1`, 
			[eventId])).rows.map(tag => tag.name)

		expect(Number(eventId)).toBeGreaterThan(0)
		expect(getType(createdEvent)).toBe('object')
		expect(createdEvent.title).toBe(eventToCreate.title)
		expect(createdEvent.description).toBe(eventToCreate.description)
		expect(new Date(createdEvent.date).toLocaleDateString())
			.toBe(eventToCreate.date)
		
		tags.forEach((tag) => {
			expect(eventToCreate.tags).toMatch(tag)
		})
	}) 

	test('getEvents', async () => {
		const events = await eventsModel.getEvents(userId)

		expect(events).toBeDefined()
		expect(getType(events)).toBe('array')

		if (events.length) {
			expect(events[0]).toHaveProperty('id')
			expect(events[0]).toHaveProperty('title')
			expect(events[0]).toHaveProperty('date')
			expect(events[0]).toHaveProperty('description')
			expect(events[0]).toHaveProperty('tags')
		}
  })

	test('updateEvent', async () => {
		await eventsModel.updateEvent(eventToUpdate, eventId)
		
		const updatedEvent = (await db.query(`
			SELECT * FROM events WHERE id = $1`, 
			[eventId])).rows[0]

		const tags = (await db.query(`
			SELECT tag_name AS name FROM events_tags WHERE event_id = $1`, 
			[eventId])).rows.map(tag => tag.name)

		expect(getType(updatedEvent)).toBe('object')
		expect(updatedEvent.title).toBe(eventToUpdate.title)
		expect(updatedEvent.description).toBe(eventToUpdate.description)
		expect(new Date(updatedEvent.date).toLocaleDateString())
			.toBe(eventToUpdate.date)

		tags.forEach((tag) => {
			expect(eventToUpdate.tags).toMatch(tag)
		})
	})

	test('deleteEvent', async () => {
		await eventsModel.deleteEvent(eventId)

		const event = (await db.query(`
			SELECT * FROM events WHERE id = $1`, 
			[eventId])).rows

		expect(event).toHaveLength(0)	
	})
})