import { fireEvent, render, screen, prettyDOM, queryByLabelText } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Content from './Content'

describe('* Form', () => {
	test('Open form', () => {
		render(<Content />)

		expect(screen.queryByRole('form')).toBeNull()
		fireEvent.click(screen.getByText('Добавить событие'))
		expect(screen.queryByRole('form')).toBeInTheDocument()
	})

	test('Close form', () => {
		render(<Content />)

		fireEvent.click(screen.getByText('Добавить событие'))
		expect(screen.queryByRole('form')).toBeInTheDocument()
		fireEvent.click(screen.getByText('Отменить'))
		expect(screen.queryByRole('form')).toBeNull()	
	})

	test('Submit new event item to list', async () => {
		render(<Content />)

		const inputTitle = screen.getByLabelText(/Название/)
		const submitButton = screen.getByText('Добавить')

		expect(screen.queryByRole('EventItem')).toBeNull()

		await userEvent.type(inputTitle, 'Hello World')
		await userEvent.click(submitButton)
		
		expect(screen.queryByRole('EventItem')).toBeInTheDocument()
		expect(screen.queryByText(/Hello World/)).toBeInTheDocument()
	})
})