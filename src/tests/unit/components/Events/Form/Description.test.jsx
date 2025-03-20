import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Description from '@/components/Events/Form/Description'
import mocks from './_mocks.js'
import { DESCRIPTION_MAX_LENGTH } from '@/constants'

const mockDescription = 'Test description'

test('Description', async () => {
	const user = userEvent.setup()
	const { getByTestId } = render(
    <Description
      inputText={mocks.inputText}
      description={mockDescription}
    />
  )
	const textarea = getByTestId('formDescription')

	expect(textarea.value).toBe(mockDescription)

	await user.clear(textarea)
	await user.type(textarea, mockDescription)

	expect(textarea.value).toBe(mockDescription)
	expect(mocks.inputText).toHaveBeenCalledTimes(mockDescription.length + 1)

	textarea.value = new Array(DESCRIPTION_MAX_LENGTH).join('0')
	await user.type(textarea, '123456789')

	expect(textarea.value.length).toBeLessThanOrEqual(DESCRIPTION_MAX_LENGTH)
})