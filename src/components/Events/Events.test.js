import { fireEvent, render, screen, prettyDOM } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Events from './Events'

describe('* Form', () => {
	test('Open form', () => {
		render(<Events />)

		expect(screen.queryByRole('form')).toBeNull()
		fireEvent.click(screen.getByText('Добавить событие'))
		expect(screen.queryByRole('form')).toBeInTheDocument()
	})

	test('Close form', () => {
		render(<Events />)

		fireEvent.click(screen.getByText('Добавить событие'))
		expect(screen.queryByRole('form')).toBeInTheDocument()
		fireEvent.click(screen.getByText('Отменить'))
		expect(screen.queryByRole('form')).toBeNull()	
	})
})