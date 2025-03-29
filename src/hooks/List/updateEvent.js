import { HOST } from '@/constants'

export default async (dataToUpdate, eventId, userId) => {
  const formData = createFormDataFrom(dataToUpdate)

  try {
    const response = await fetch(
      `${HOST}/events?userId=${userId}&eventId=${eventId}`,
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

function createFormDataFrom(data) {
  const formData = new FormData()

  for (const field in data) {
    if (field === 'photosToInsert') {
      for (const photo of data[field]) {
        formData.set(photo.id, photo.file)
        formData.append(field, JSON.stringify({
          id: photo.id,
          name: photo.name,
          width: photo.width,
          height: photo.height,
        }))
      }
      delete data[field]
    } else if (field === 'photosToDelete') {
      formData.set(field, JSON.stringify(data[field]))
      delete data[field]
    } else if (field !== 'photos') {
      formData.set(field, data[field])
    }
  }

  return formData
}