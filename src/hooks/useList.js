import { useState } from "react"

import fetchStream from "@/utils/fetchStream"

export default (userId) => {
  function addEvent(event) {
    fetch(`http://localhost:5000/events?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(event)
    })
    .then((response) => fetchStream(response.body, response.headers.get('content-type')))
		.then((eventId) => {
      event.id = eventId
      setList([ ...list, event ])
    })
    .catch(error => console.log(error))
  }

  function getList() {
		fetch(`http://localhost:5000/events?userId=${userId}&userLocale=${navigator.language}`)
		.then((response) => fetchStream(response.body, response.headers.get('content-type')))
		.then(list => {
      setList(list)
    })
    .catch(error => console.log(error))
	}

  function updateEvent(eventId, dataToUpdate) {
    fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
    })
    .then(() => {
      setList(
        list.map((event) => {
          if (event.id !== eventId) return event
          else return { ...event, ...dataToUpdate }
        })
      )
    })
    .catch(error => console.log(error))
  }

  function deleteEvent(eventId) {
    fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
      method: 'DELETE'
    })
    .then(() => {
      setList(list.filter((event) => event.id !== eventId))
    })
  }

  const [list, setList] = useState([])

  return { list, addEvent, updateEvent, deleteEvent, getList }
}