import getImageDimensions from './getImageDimensions'
import { PHOTO_MAX_SIZE } from '@/constants'

export default async files => {
  const photos = []

  for (let file of files) {
    validateFile(file)

    const id = Math.random()
    const name = file.name
    const src = URL.createObjectURL(file)
    const { width, height } = await getImageDimensions(src)

    photos.push({
      id,
      name,
      src,
      width,
      height,
      file,
    })

    URL.revokeObjectURL(src)
  }

  return photos
}

function validateFile(file) {
  if (file.size > PHOTO_MAX_SIZE) {
    throw new Error('Размер файла должен быть меньше 10 Мб', { cause: 'TOO_LARGE_FILE' })
  }
}
