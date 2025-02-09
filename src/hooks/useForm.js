import { useState } from "react"

//! (date) => new Date(date).toLocaleDateString()

import { MAX_PHOTOS_COUNT } from '@/constants'
import getImageDimensions from '@/utils/getImageDimensions'

export default function useForm() {

  function inputText(e) {
    const { name, value } = e.target

    if (name === 'tags') {
      setFormData({
        ...formData,
        [name]: value.split(/[\s\.,]+/),
      })

    } else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  async function addPhotos(fileList) {
    const fileArray = [...fileList].slice(0, MAX_PHOTOS_COUNT - formData.photos.length)

    try {
      const newPhotos = []

      for (let file of fileArray) {
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

      setFormData({
        ...formData,
        photos: [...formData.photos, ...newPhotos]
      })

    } catch (error) {
      if (error.cause === 'TOO_LARGE_FILE') setErrorMessage('Размер файла должен быть меньше 10 Мб')
      else if (error.cause === 'UPLOAD_ERROR') setErrorMessage('Файл не удалось загрузить')
      else setErrorMessage('Неизвестная ошибка')
    }

		setTimeout(setErrorMessage, 3000, '')
	}

  function removePhoto(photoToRemove) {
    setFormData({
      ...formData,
      photos: formData.photos.filter((photo) => photo !== photoToRemove),
    })
  }

  function fillFormWithCurrentItemData(currentItem) {
    setFormData({
      id: currentItem.id,
      date: currentItem.date,
      title: currentItem.title,
      description: currentItem.description,
      photos: currentItem.photos,
      tags: currentItem.tags
    })
  }
  
	const [formData, setFormData] = useState({
    id: new Date().getTime(),
    date: '',
    title: '',
    description: '',
    photos: [],
    tags: []
  })
  
	const [uploadErrorMessage, setErrorMessage] = useState('')

  return {
    formData,
		inputText,
    addPhotos,
    removePhoto,
    uploadErrorMessage,
    fillFormWithCurrentItemData
  }
}