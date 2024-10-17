import userEvent from '@testing-library/user-event';
import { fireEvent, render } from '@testing-library/react';

import Content from './Content'

describe('*Content', () => {
	test('Open form', () => {
		const { getByRole, getByText } = render(<Content />)

		fireEvent.click(getByText(/Добавить событие/))

		expect(getByRole('form')).toBeInTheDocument()
	})

	test('Close form', () => {
		const { queryByRole, getByText } = render(<Content />)

		fireEvent.click(getByText(/Добавить событие/))
		fireEvent.click( getByText(/Отменить/) )

		expect(queryByRole('form')).toBeNull()
	})

	// test('Adding item to list', async () => {
	// 	const { getByRole, getAllByRole } = render(<Content />)
	// 	const user = userEvent.setup()

	// 	let listLength = getAllByRole('event').length

	// 	await user.click(getByRole('addEvent'))
		
	// 	expect(getAllByRole('event').length).toBe(++listLength)
	// })
})