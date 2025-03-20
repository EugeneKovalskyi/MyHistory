import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Tags from '@/components/Events/Form/Tags'
import mocks from './_mocks'
import { TAGS_MAX_LENGTH } from '@/constants'

const mockTags = 'tag1 tag2 tag3'

test('Tags', async () => {
  const user = userEvent.setup()
  const { getByTestId } = render(
    <Tags
      inputText={mocks.inputText}
      tags={mockTags}
    />
  )
  const input = getByTestId('formTags')

  expect(input.value).toBe(mockTags)

  await user.clear(input)
  await user.type(input, mockTags)

  expect(input.value).toBe(mockTags)
  expect(mocks.inputText).toHaveBeenCalledTimes(mockTags.length + 1)

  input.value = new Array(TAGS_MAX_LENGTH).join('0')
  await user.type(input, '123456789')

  expect(input.value.length).toBeLessThanOrEqual(TAGS_MAX_LENGTH)
})
