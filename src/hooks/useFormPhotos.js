import { useState } from 'react'

import { MAX_PHOTOS_NUMBER } from '@/constants'
import getUploadedPhotos from '@/utils/getUploadedPhotos'

export default (updatedEvent, setFormData, currentPhotosNumber) => {
  const [photosToDelete, setPhotosToDelete] = useState([])
  const [photosToInsert, setPhotosToInsert] = useState([])
  const [uploadErrorMessage, setErrorMessage] = useState('')

  async function addPhotos(fileList) {
    const availablePhotosNumber = MAX_PHOTOS_NUMBER - currentPhotosNumber
    const uploadedFiles = [...fileList].slice(0, availablePhotosNumber)

    try {
      const photos = await getUploadedPhotos(uploadedFiles)

      setFormData(formData => ({
        ...formData,
        photos: [...formData.photos, ...photos],
      }))

      if (updatedEvent) setPhotosToInsert([...photosToInsert, ...photos])

    } catch (error) {
      setErrorMessage(error.message)
      setTimeout(setErrorMessage, 3000, '')
    }
  }

  function deletePhoto(id) {
    setFormData(formData => ({
      ...formData,
      photos: formData.photos.filter(photo => photo.id !== id),
    }))

    if (updatedEvent) setPhotosToDelete([...photosToDelete, id])
  }

  function resetPhotosToInsert() {
    setPhotosToInsert([])
  }

  function resetPhotosToDelete() {
    setPhotosToDelete([])
  }

  return {
    photosToInsert,
    photosToDelete,
    uploadErrorMessage,
		resetPhotosToInsert,
    resetPhotosToDelete,
    addPhotos,
    deletePhoto
  }
}
