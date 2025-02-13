import { useState } from "react"

import { MAX_PHOTOS_COUNT } from '@/constants'
import getImageDimensions from '@/utils/getImageDimensions'

export default function useForm() {

  function inputText(e) {
    const { name, value } = e.target

    if (name === 'tags') {
      setFormData({
        ...formData,
        [name]: value.split(/[\s\.,]+/).join(' ').toLowerCase(),
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

  function fillFormWithSelectedItemData(selectedItem) {
    setFormData({
      id: selectedItem.id,
      date: selectedItem.date,
      title: selectedItem.title,
      description: selectedItem.description,
      // photos: selectedItem.photos,
      tags: selectedItem.tags
    })
  }
  
	const [formData, setFormData] = useState({
    id: null,
    date: '',
    title: '',
    description: '',
    photos: [],
    tags: ''
  })
  
	const [uploadErrorMessage, setErrorMessage] = useState('')

  return {
    formData,
		inputText,
    addPhotos,
    removePhoto,
    uploadErrorMessage,
    fillFormWithSelectedItemData
  }
}