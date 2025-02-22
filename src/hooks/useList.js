import { useState } from 'react'

export default (userId) => {

  async function addEvent(event) {
    try {
      const formData = new FormData()

      for (let field in event) {
        if (field === 'photos') {
          for (let photo of event['photos']) {
            formData.set(photo.id, photo.file)
            delete photo.file
            formData.append('photos', JSON.stringify(photo))
          }
        } else {
          formData.set(field, event[field])
        }
      }

      const response = await fetch(
        `http://localhost:5000/events?userId=${userId}`,
        {
          method: 'POST',
          body: formData
        }
      )

      event.id = await response.text()

      setList([...list, event])

    } catch (error) {
      console.log(error)
    }
  }

  async function getList() {
    try {
      const response = await fetch(
        `http://localhost:5000/events?userId=${userId}`
      )

      const list = await response.json()
      
      setList(list)

    } catch (error) {
      console.log(error)
    }
	}

  async function updateEvent(eventId, dataToUpdate) {
    try {
      await fetch(
        `http://localhost:5000/events?userId=${userId}&eventId=${eventId}`,
        {
          method: 'PATCH',
          body: JSON.stringify(dataToUpdate),
        }
      )

      setList(
        list.map((event) => {
          if (event.id !== eventId) return event
          else return { ...event, ...dataToUpdate }
        })
      )

    } catch (error) {
      console.log(error)
    }
  }

  async function deleteEvent(eventId) {
    try {
      await fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
        method: 'DELETE'
      })

      setList(list.filter((event) => event.id !== eventId))

    } catch (error) {
      console.log(error)
    }
  }

  const [list, setList] = useState([])

  return { list, addEvent, updateEvent, deleteEvent, getList }
}