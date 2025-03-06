import { useState } from 'react'

import useFormPhotos from './useFormPhotos'

export default updatedEvent => {
  const [formData, setFormData] = useState({
    id: '',
    date: '',
    title: '',
    description: '',
    photos: [],
    tags: ''
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

  function fillFormWithUpdatedEvent() {
    setFormData({
      id: updatedEvent.id,
      date: updatedEvent.date,
      title: updatedEvent.title,
      description: updatedEvent.description,
      photos: updatedEvent.photos,
      tags: updatedEvent.tags
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