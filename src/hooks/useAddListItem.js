import { useState } from "react"

export default function useAddListItem(initialList) {
  function addItem(item) {
    setList([...list, item])
  }

  const [list, setList] = useState(initialList)

  return [ list, addItem ]
}
