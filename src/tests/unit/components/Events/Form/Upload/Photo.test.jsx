import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Photo from '@/components/Events/Form/Upload/Photo'
import mocks from './_mocks.js'

test('Photo', async () => {
	const user = userEvent.setup()
	const mockPhoto = mocks.photos[0]
	const { container, getByTestId } = render(
    <Photo
      photo={mockPhoto}
      deletePhoto={mocks.deletePhoto}
    />
  )
	const photo = getByTestId('formPhoto')
	const deletePhoto = getByTestId('formDeletePhoto')

	expect(deletePhoto.classList).toContain('opacity-0')
	await user.pointer({ target: photo })
	expect(deletePhoto.classList).toContain('opacity-100')

	expect(mocks.deletePhoto).not.toHaveBeenCalled()
	await user.pointer('[MouseLeft]')
	expect(mocks.deletePhoto).toHaveBeenCalledWith(mockPhoto.id)

	await user.pointer({ target: container.parentElement })
	expect(deletePhoto.classList).toContain('opacity-0')
})