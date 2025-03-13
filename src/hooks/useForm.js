import { useState } from 'react'

import useFormPhotos from './useFormPhotos'

export default updatedEvent => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
    tags: '',
    photos: []
  })

  const { 
    photosToInsert,
    photosToDelete,
    uploadErrorMessage,
    resetPhotosToInsert,
    resetPhotosToDelete,
    addPhotos,
    deletePhoto
  } = useFormPhotos(updatedEvent, setFormData, formData.photos.length)

  function getDataToUpdate() {
    const dataToUpdate = {}

    if (photosToInsert.length) {
      dataToUpdate.photosToInsert = [...photosToInsert]
      resetPhotosToInsert()
    }
    if (photosToDelete.length) {
      dataToUpdate.photosToDelete = [...photosToDelete]
      resetPhotosToDelete()
    }

    for (let field in updatedEvent) {
      if (formData[field] !== updatedEvent[field]) {
        dataToUpdate[field] = formData[field]
      }
    }
    return dataToUpdate
  }
  
  function inputText(e) {
    const { name, value } = e.target

    switch(name) {
      case 'tags': 
        setFormData({
          ...formData,
          [name]: value
            .trim()
            .split(/[\s\.,]+/)
            .filter(tag => tag)
            .join(' ')
            .toLowerCase(),
        })
      break

      case 'date':
        setFormData({
          ...formData, 
          [name]: new Date(value).toLocaleDateString()
        })
        break

      default:
        setFormData({
          ...formData,
          [name]: value,
        })
    }
  }

  function fillFormWithUpdatedEvent() {
    setFormData({
      id: updatedEvent.id,
      date: updatedEvent.date,
      title: updatedEvent.title,
      description: updatedEvent.description,
      tags: updatedEvent.tags,
      photos: updatedEvent.photos
    })
  }
  
  return {
    formData,
    getDataToUpdate,
    uploadErrorMessage,
		inputText,
    fillFormWithUpdatedEvent,
    addPhotos,
    deletePhoto
  }
}