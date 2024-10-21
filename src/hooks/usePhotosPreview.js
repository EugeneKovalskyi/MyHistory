import { useState } from "react";
import { MAX_PHOTOS_COUNT } from '../constants/formConstants'
import getImageDimensions from '../utils/getImageDimensions'

export default function usePhotosPreview() {

	async function addPhotos(e) {
    const files = [...e.target.files].slice(0, MAX_PHOTOS_COUNT - photos.length)

    try {
      const newPhotos = []

      for (let file of files) {
        if (file.size > 10485760) {
          throw new Error('Файл слишком большой!', { cause: 'TOO_LARGE_FILE' })
        }

        const src = URL.createObjectURL(file)
        const alt = file.name
        const { width, height } = await getImageDimensions(src)

        newPhotos.push({
          src,
          alt,
          width,
          height,
        })

        URL.revokeObjectURL(src)
      }

      setPhotos( [...photos, ...newPhotos] )

    } catch (error) {
       handleError(error.cause)
    }
  }

	function removePhoto(photoToRemove) {
		setPhotos(photos.filter(photo => photo !== photoToRemove))
	}

	function handleError(cause) {
		if (cause === 'TOO_LARGE_FILE') setErrorMessage('Размер файла должен быть меньше 10 Мб')
		else if (cause === 'UPLOAD_ERROR') setErrorMessage('Файл не удалось загрузить')
		else setErrorMessage('Неизвестная ошибка')

		setTimeout(setErrorMessage, 5000, '')
	}

	const [photos, setPhotos] = useState([])
	const [errorMessage, setErrorMessage] = useState('')

	return { photos, addPhotos, removePhoto, errorMessage }
}