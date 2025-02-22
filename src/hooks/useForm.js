import { useState } from 'react'

import { MAX_PHOTOS_NUMBER } from '@/constants'
import getUploadedPhotos from '@/utils/getUploadedPhotos'

export default () => {
  
  function inputText(e) {
    const { name, value } = e.target

    if (name === 'tags') {
      setFormData({
        ...formData,
        [name]: value.split(/[\s\.,]+/).join(' ').toLowerCase(),
      })
    } else if (name === 'date') {
      setFormData({
        ...formData, 
        [name]: new Date(value).toLocaleDateString()
      })
    }
    else {
      setFormData({
        ...formData,
        [name]: value,
      })
    }
  }

  async function addPhotos(fileList) {
    const availablePhotosNumber = MAX_PHOTOS_NUMBER - formData.photos.length
    const uploadedFiles = [ ...fileList ].slice(0, availablePhotosNumber)
    
    try {
      const photos = await getUploadedPhotos(uploadedFiles)

      setFormData({
        ...formData,
        photos: [ ...formData.photos, ...photos ],
      })
      
    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(setErrorMessage, 3000, '')
    }
  }

  function deletePhoto(id) {
    setFormData({
      ...formData,
      photos: formData.photos.filter(photo => photo.id !== id),
    })
  }

  function fillFormWithUpdatedEvent(updatedEvent) {
    setFormData({
      id: updatedEvent.id,
      date: updatedEvent.date,
      title: updatedEvent.title,
      description: updatedEvent.description,
      photos: updatedEvent.photos,
      tags: updatedEvent.tags
    })
  }
  
	const [formData, setFormData] = useState({
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
    deletePhoto,
    uploadErrorMessage,
    fillFormWithUpdatedEvent
  }
}