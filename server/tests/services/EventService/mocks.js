const fs = require('fs')

const userId = '1'

const createdEvent = {
	id: Math.random(),
	title: 'Created title',
	date: '11.11.1111',
	description: 'Created description',
	tags: 'created tag',
	photos: [
		{
			id: '0.1',
			name: '1.jpg',
			width: 2560,
			height: 1440,
			buffer: fs.readFileSync('/home/t_tarantul/Изображения/1.jpg')
		}
	]
}

const updatedEvent = {
	title: 'Updated title',
	date: '22.12.2222',
	description: 'Updated description',
	tags: 'updated tag',
	photosToInsert: [
		{
			id: '0.2',
			name: '2.jpg',
			width: 1920,
			height: 1080,
			buffer: fs.readFileSync('/home/t_tarantul/Изображения/2.jpg')
		}
	],
	photosToDelete: []
}

module.exports = {
	userId,
	createdEvent,
	updatedEvent,
}