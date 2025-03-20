const router = require('#Router')
const { EventEmitter } = require('stream')

describe('Router', () => {
  test('Router: Набор методов и свойств', () => {
		expect(router).toHaveProperty('post')
    expect(router).toHaveProperty('get')
    expect(router).toHaveProperty('patch')
    expect(router).toHaveProperty('delete')
    expect(router).toHaveProperty('emit')
    expect(router).toHaveProperty('eventEmitter')
    expect(router.eventEmitter).toBeInstanceOf(EventEmitter)
    expect(router.eventSet).toBeInstanceOf(Set)
  })

  test('Router: Подписка на событие-запрос', () => {
		const handler = () => true
		const pathname = '/test'
    const methods = ['POST', 'GET', 'PATCH', 'DELETE']

    router.post(pathname, handler)
    router.get(pathname, handler)
    router.patch(pathname, handler)
    router.delete(pathname, handler)

    for (const method of methods) {
      const event = method + pathname
      expect(router.eventEmitter._events).toHaveProperty(event)
      expect(router.eventEmitter._events[event]).toBe(handler)
    }

    expect(() => router.post(pathname, handler)).toThrow()
    expect(() => router.get(pathname, handler)).toThrow()
    expect(() => router.patch(pathname, handler)).toThrow()
    expect(() => router.delete(pathname, handler)).toThrow()
  })

	test('Router: Триггер события', () => {
		const res = { end: jest.fn() }
		const args = ['event', 'req', res]
		router.eventEmitter.emit = jest.fn((event, req, res) => false)

		router.emit(...args)

    expect(router.eventEmitter.emit).toHaveBeenCalledWith(...args)
		expect(res.end).toHaveBeenCalled()
  })
})
