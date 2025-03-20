import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Title from '@/components/Events/Form/Title'
import mocks from './_mocks.js'
import { TITLE_MAX_LENGTH } from '@/constants'

const mockTitle = 'Test title'

test('Title', async () => {
	const user = userEvent.setup()
	const { getByTestId } = render(
    <Title
      inputText={mocks.inputText}
      title={mockTitle}
    />
  )
	const input = getByTestId('formTitle')

	expect(input.value).toBe(mockTitle)

	await user.clear(input)
	await user.type(input, mockTitle)

	expect(input.value).toBe(mockTitle)
	expect(mocks.inputText).toHaveBeenCalledTimes(mockTitle.length + 1)

	input.value = new Array(TITLE_MAX_LENGTH).join('0')
	await user.type(input, '123456789')

	expect(input.value.length).toBeLessThanOrEqual(TITLE_MAX_LENGTH)
})