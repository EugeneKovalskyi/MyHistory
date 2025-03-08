const eventsController = require('../controllers/EventController')

test('EventController', () => {
	expect(eventsController).toHaveProperty('post')
	expect(eventsController).toHaveProperty('get')
	expect(eventsController).toHaveProperty('patch')
	expect(eventsController).toHaveProperty('delete')
});