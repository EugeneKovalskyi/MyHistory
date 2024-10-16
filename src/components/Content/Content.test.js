import { fireEvent, render } from '@testing-library/react';
import Content from './Content'
import userEvent from '@testing-library/user-event';

describe('Content', () => {
	test('New item to the list', () => {
		const { getByRole, getAllByRole } = render(<Content />)

		let listLength = getAllByRole('event').length

		fireEvent.click(getByRole('addEvent'))
		
		expect(getAllByRole('event').length).toBe(++listLength)
	})

	// test('Adding item to list', async () => {
	// 	const { getByRole, getAllByRole } = render(<Content />)
	// 	const user = userEvent.setup()

	// 	let listLength = getAllByRole('event').length

	// 	await user.click(getByRole('addEvent'))
		
	// 	expect(getAllByRole('event').length).toBe(++listLength)
	// })
})