import { useState } from "react"

export default function useAddListItem(initialList, newItem) {
  const [list, setList] = useState(initialList)

  return [list, addItem]

  function addItem() {
    setList([...list, newItem])
  }
}
