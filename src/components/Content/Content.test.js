import { fireEvent, render, screen, prettyDOM } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Content from './Content.jsx'

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
})