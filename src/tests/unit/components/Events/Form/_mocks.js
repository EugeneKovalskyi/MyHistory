export default {
	addEvent: jest.fn(),
	updateEvent: jest.fn(),
	deleteEvent: jest.fn(),
	hideForm: jest.fn(),
	inputText: jest.fn(),

	event: {
		id: 1,
		date: '11.11.2000',
		title: 'Test title',
		description: 'Test description',
		tags: 'tag1 tag2 tag3',
		photos: []
	},

	userInputs: {
		date: '2025-04-05',
		title: 'Updated test title',
		description: 'Updated test description',
		tags: 'tag4 tag2',
	}
}