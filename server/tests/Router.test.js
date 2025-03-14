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

    router.post(pathname, handler)

		expect(router.eventEmitter._events).toHaveProperty('POST/test')
		expect(router.eventEmitter._events['POST/test']).toBe(handler)
		expect(() => router.post(pathname, handler)).toThrow()
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
