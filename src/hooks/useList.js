import { useState } from 'react'

export default userId => {
  const [list, setList] = useState([])

  async function addEvent(event) {
    try {
      const formData = new FormData()

      for (const field in event) {
        if (field === 'photos') {
          for (const photo of event[field]) {
            formData.set(photo.id, photo.file)
            formData.append(field, JSON.stringify({
              id: photo.id,
              name: photo.name,
              width: photo.width,
              height: photo.height,
            }))
          }
        } else {
          formData.set(field, event[field])
        }
      }

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

      setList([...list, event])
      
    } catch (error) {
      console.log(error)
    }
  }

  async function getList() {
    try {
      const response = await fetch(`http://localhost:5000/events?userId=${userId}`)
      const list = await response.json()

      setList(list)

    } catch (error) {
      console.log(error)
    }
  }

  async function updateEvent(dataToUpdate, eventId) {
    try {
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
        
      setList(list.map(event => {
        if (event.id !== eventId) return event
        else return { ...event, ...dataToUpdate }
      }))

    } catch (error) {
      console.log(error)
    }
  }

  async function deleteEvent(eventId) {
    try {
      await fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
        method: 'DELETE',
      })

      setList(list.filter(event => event.id !== eventId))

    } catch (error) {
      console.log(error)
    }
  }

  return { list, addEvent, updateEvent, deleteEvent, getList }
}
