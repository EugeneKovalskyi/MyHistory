const router = require('../Router')

test('Router', () => {
	expect(router).toHaveProperty('emit')
	expect(router).toHaveProperty('post')
	expect(router).toHaveProperty('get')
	expect(router).toHaveProperty('patch')
	expect(router).toHaveProperty('delete')
});