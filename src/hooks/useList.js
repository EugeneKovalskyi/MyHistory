import { useState } from 'react'

export default function useList(initialList) {
  function addListItem(item) {
    setList([...list, item])
  }

  function updateListItem(updatedItem) {
    setList(
      list.map((item) => {
        if (item.id !== updatedItem.id) return item
        else return updatedItem
      })
    )
  }

  function removeListItem(itemToRemove) {
    setList(list.filter((item) => item.id !== itemToRemove.id))
  }

  const [list, setList] = useState(initialList)

  return { list, addListItem, updateListItem, removeListItem }
}
