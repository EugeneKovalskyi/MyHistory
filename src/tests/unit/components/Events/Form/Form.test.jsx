import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Form from '@/components/Events/Form/Form'
import mocks from './_mocks.js'

describe('Form', () => {
	test('Отправка нового события', () => {
		const { getByTestId } = render(
      <Form
        addEvent={mocks.addEvent}
        hideForm={mocks.hideForm}
      />
    )

		fireEvent.change(
			getByTestId('formDate'), 
			{ target: { valueAsDate: new Date(mocks.event.date) } }
		)
		fireEvent.change(
			getByTestId('formTitle'), 
			{ target: { value: mocks.event.title }}
		)

		fireEvent.click(getByTestId('formSubmit'))
		expect(mocks.addEvent).toHaveBeenCalled()
		expect(mocks.hideForm).toHaveBeenCalled()
	})

	test('Обновление события', () => {
		const { getByTestId } = render(
      <Form
        updateEvent={mocks.updateEvent}
        hideForm={mocks.hideForm}
        updatedEvent={mocks.event}
      />
    )
		
		expect(new Date(getByTestId('formDate').value).toLocaleDateString('ru-RU'))
			.toBe(mocks.event.date)
		expect(getByTestId('formTitle').value).toBe(mocks.event.title)
		expect(getByTestId('formDescription').value).toBe(mocks.event.description)
		expect(getByTestId('formTags').value).toBe(mocks.event.tags)

		fireEvent.change(
			getByTestId('formDate'), 
			{ target: { valueAsDate: new Date(mocks.userInputs.date) } }
		)
		fireEvent.change(
			getByTestId('formTitle'),
			 { target: { value: mocks.userInputs.title }}
		)
		fireEvent.change(
			getByTestId('formDescription'),
			 { target: { value: mocks.userInputs.description }}
		)
		fireEvent.change(
			getByTestId('formTags'),
		 { target: { value: mocks.userInputs.tags }}
		)

		fireEvent.click(getByTestId('formSubmit'))
		expect(mocks.updateEvent).toHaveBeenCalled()
		expect(mocks.hideForm).toHaveBeenCalled()

		const [ dataToUpdate, eventId ] = mocks.updateEvent.mock.calls.flat(1)
		expect(eventId).toBe(mocks.event.id)
		expect(dataToUpdate.date)
			.toBe(new Date(mocks.userInputs.date).toLocaleDateString('ru-RU'))
		expect(dataToUpdate.title).toBe(mocks.userInputs.title)
		expect(dataToUpdate.description).toBe(mocks.userInputs.description)
		expect(dataToUpdate.tags).toBe(mocks.userInputs.tags)
	})

	test('Удаление события', () => {
		const { getByTestId } = render(
      <Form
        deleteEvent={mocks.deleteEvent}
        hideForm={mocks.hideForm}
      />
    )

		fireEvent.click(getByTestId('formDelete'))
		expect(mocks.deleteEvent).toHaveBeenCalled()
		expect(mocks.hideForm).toHaveBeenCalled()
	})

	test('Отмена изменений в форме', () => {
		const { getByTestId } = render(<Form hideForm={mocks.hideForm} />)

		fireEvent.click(getByTestId('formCancel'))
		expect(mocks.hideForm).toHaveBeenCalled()
	})
})