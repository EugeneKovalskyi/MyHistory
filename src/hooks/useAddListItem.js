import { useState } from "react"

export default function useAddListItem(initialList) {
  const [list, setList] = useState(initialList)

  return [list, addItem]

  function addItem(item) {
    setList([...list, item])
  }
}
