import { useState } from "react"

import fetchStream from "@/utils/fetchStream"

export default function useList(userId) {
  function addListItem(item) {
    fetch(`http://localhost:5000/events?userId=${userId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
    })
    .then((response) => fetchStream(response.body, response.headers.get('content-type')))
		.then((eventId) => {
      item.id = eventId
      setList([ ...list, item ])
    })
    .catch(error => console.log(error))
  }

  function getList() {
		fetch(`http://localhost:5000/events?userId=${userId}`)
		.then((response) => fetchStream(response.body, response.headers.get('content-type')))
		.then(eventList => {
      setList(eventList)
    })
    .catch(error => console.log(error))
	}

  function updateListItem(eventId, dataToUpdate) {
    fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(dataToUpdate)
    })
    .then(() => {
      setList(
        list.map((item) => {
          if (item.id !== eventId) return item
          else return { ...item, ...dataToUpdate }
        })
      )
    })
    .catch(error => console.log(error))
  }

  function removeListItem(eventId) {
    fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
      method: 'DELETE'
    })
    .then(() => {
      setList(list.filter((item) => item.id !== eventId))
    })
  }

  const [list, setList] = useState([])

  return { list, addListItem, updateListItem, removeListItem, getList }
}