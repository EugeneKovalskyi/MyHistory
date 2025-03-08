import { useState } from 'react'

import getList from './getList'
import addEvent from './addEvent'
import updateEvent from './updateEvent'
import deleteEvent from './deleteEvent'

export default userId => {
  const [list, setList] = useState([])

  async function handleGetList() {
    const response = await getList(userId)
    setList(response)
  }

  async function handleAddEvent(event) {
    const response = await addEvent(event, userId)
    setList([...list, response])
  }

  async function handleUpdateEvent(dataToUpdate, eventId) {
    const response = await updateEvent(dataToUpdate, eventId, userId)
    setList(
      list.map(event => {
        if (event.id !== eventId) return event
        else return { ...event, ...response }
      })
    )
  }

  async function handleDeleteEvent(eventId) {
    await deleteEvent(eventId, userId)
    setList(list.filter(event => event.id !== eventId))
  }

  return {
    list,
    getList: handleGetList,
    addEvent: handleAddEvent,
    updateEvent: handleUpdateEvent,
    deleteEvent: handleDeleteEvent,
  }
}
