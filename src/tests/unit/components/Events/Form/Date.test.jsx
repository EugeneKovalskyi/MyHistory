import { screen, render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'

import Date from '@/components/Events/Form/Date'
import mocks from './_mocks.js'

const mockDate = '05.04.2025'

test('Date', () => {
  const { getByTestId } = render(
    <Date
      inputText={mocks.inputText}
      date={mockDate}
    />
  )
  const input = getByTestId('formDate')

  expect(new global.Date(input.value).toLocaleDateString()).toBe(mockDate)
  fireEvent.change(input, { target: { valueAsDate: new global.Date('2002-02-15') } })
  expect(mocks.inputText).toHaveBeenCalled()
})
