import { screen, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'

import Upload from '@/components/Events/Form/Upload/Upload.jsx'
import mocks from './_mocks.js'

test('Upload', async () => {
  const user = userEvent.setup()
  const photos = mocks.photos
  const { getByTestId, getAllByTestId } = render(
    <Upload
      photos={photos}
      addPhotos={mocks.addPhotos}
      deletePhoto={mocks.deletePhoto}
      uploadErrorMessage={'Upload error'}
    />
  )
  const input = getByTestId('uploadInput')

  expect(getAllByTestId('formPhoto')).toHaveLength(photos.length)

  for (const photo of getAllByTestId('formPhoto'))
    await user.pointer({ target: photo, keys: '[MouseLeft]' })

  expect(mocks.deletePhoto).toHaveBeenCalledTimes(2)

  await user.upload(
    input,
    photos.map(photo => new File([photo.src], photo.name, { type: 'image/jpg' }))
  )

  expect(mocks.addPhotos).toHaveBeenCalledTimes(1)
})
