export default async (dataToUpdate, eventId, userId) => {
  const formData = new FormData()

  for (const field in dataToUpdate) {
    if (field === 'photosToInsert') {
      for (const photo of dataToUpdate[field]) {
        formData.set(photo.id, photo.file)
        formData.append(field, JSON.stringify({
          id: photo.id,
          name: photo.name,
          width: photo.width,
          height: photo.height,
        }))
      }
      delete dataToUpdate[field]
    } else if (field === 'photosToDelete') {
      formData.set(field, JSON.stringify(dataToUpdate[field]))
      delete dataToUpdate[field]
    } else if (field !== 'photos') {
      formData.set(field, dataToUpdate[field])
    }
  }

  try {
    const response = await fetch(
      `http://localhost:5000/events?userId=${userId}&eventId=${eventId}`,
      {
        method: 'PATCH',
        body: formData,
      }
    )

    const photosIds = await response.json()

    if (photosIds) {
      for (let photo of dataToUpdate.photos) {
        if (photo.id < 1) {
          photo.id = photosIds[photo.id]
        }
      }
    }

    return dataToUpdate

  } catch (error) {
    console.log(error)
  }
}
