const fs = require('fs')
const path = require('path')

const db = require('../../../db/db')
const EventModel = require('../../../models/EventModel')
const { clearTestDB, getTestDBData } = require('./utils')
const { userId, createdEvent, updatedEvent } = require('./mocks')
const userPhotosPath = path.join(process.env.PHOTOS_PATH, userId)

afterAll(async () => await clearTestDB(userId, userPhotosPath))

describe('EventService', () => {
	let eventId = null
	let photosIds = null

	test('createEvent', async () => {
		const ids = await EventModel.createEvent(createdEvent, userId)
		eventId = ids.eventId
		photosIds = ids.photosIds
		const { event, tags, photos } = await getTestDBData(eventId)

		expect(Number(eventId)).toBeGreaterThanOrEqual(1)
		expect(event.title).toBe(createdEvent.title)
		expect(event.description).toBe(createdEvent.description)
		expect(new Date(event.date).toLocaleDateString()).toBe(createdEvent.date)
		tags.forEach(tag => expect(createdEvent.tags).toMatch(tag))

		expect(photosIds).not.toBeNull()
		expect(Object.keys(photosIds)[0]).toBe(createdEvent.photos[0].id)
		expect(photos).toHaveLength(1)
		expect(photos[0].width).toBe(2560)
		expect(photos[0].height).toBe(1440)
		expect(fs.existsSync(photos[0].path)).toBeTruthy()
	})

	test('getEvents', async () => {
		const event = (await EventModel.getEvents(userId))[0]
		const photo = event.photos[0]

		expect(event).toBeDefined()
		expect(event).toHaveProperty('id')
		expect(event).toHaveProperty('title')
		expect(event).toHaveProperty('date')
		expect(event).toHaveProperty('description')
		expect(event).toHaveProperty('tags')
		expect(event).toHaveProperty('photos')

		expect(photo).toBeDefined()
		expect(photo).toHaveProperty('id')
		expect(photo).toHaveProperty('name')
		expect(photo).toHaveProperty('width')
		expect(photo).toHaveProperty('height')
		expect(photo).toHaveProperty('src')
	})

	test('updateEvent', async () => {
		const deletedPhotoId = photosIds[createdEvent.photos[0].id]
		updatedEvent.photosToDelete.push(deletedPhotoId)
		photosIds = await EventModel.updateEvent(updatedEvent, eventId, userId)

		const { event, tags, photos } = await getTestDBData(eventId)
		const insertedPhoto = updatedEvent.photosToInsert[0]
		const photo = photos[0]

		expect(event.title).toBe(updatedEvent.title)
		expect(event.description).toBe(updatedEvent.description)
		expect(new Date(event.date).toLocaleDateString())
			.toBe(updatedEvent.date)
		tags.forEach((tag) => {
			expect(updatedEvent.tags).toMatch(tag)
		})

		expect(photosIds).toBeTruthy()
		expect(photos).toHaveLength(1)
		expect(photo.id).toBe(photosIds[insertedPhoto.id])
		expect(photo.width).toBe(insertedPhoto.width)
		expect(photo.height).toBe(insertedPhoto.height)
		expect(fs.existsSync(photo.path)).toBeTruthy()
		expect(fs.readdirSync(path.join(userPhotosPath, eventId))).toHaveLength(1)
	})

	test('deleteEvent', async () => {
		await EventModel.deleteEvent(eventId, userId)

		const event = (await db.query(`
			SELECT * FROM events WHERE id = $1`, 
			[eventId])).rows

		expect(event).toHaveLength(0)	
		expect(fs.readdirSync(path.join(userPhotosPath))).toHaveLength(0)
	})
})