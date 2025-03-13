export default async (event, userId) => {
  const formData = createFormDataFrom(event)

  try {
    const response = await fetch(`http://localhost:5000/events?userId=${userId}`, {
      method: 'POST',
      body: formData,
    })
    const ids = await response.json()

    event.id = ids.eventId
    
    if (ids.photosIds) {
      for (const photo of event.photos) {
        if (photo.id < 1) {
          photo.id = ids.photosIds[photo.id]
        }
      }
    }

    return event

  } catch (error) {
    console.log(error)
  }
}

function createFormDataFrom(data) {
  const formData = new FormData()

  for (const field in data) {
    if (field === 'photos') {
      for (const photo of data[field]) {
        formData.set(photo.id, photo.file)
        formData.append(field, JSON.stringify({
          id: photo.id,
          name: photo.name,
          width: photo.width,
          height: photo.height,
        }))
      }

    } else {
      formData.set(field, data[field])
    }
  }

  return formData
}