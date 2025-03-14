const EventController = require('#controllers/EventController')

describe('EventController', () => {
  test('Наличие необходимых методов', () => {
    expect(EventController).toHaveProperty('post')
    expect(EventController).toHaveProperty('get')
    expect(EventController).toHaveProperty('patch')
    expect(EventController).toHaveProperty('delete')
  })
})