import { useState } from "react"

export default function useList(initialList) {
  function addListItem(item) {
    setList([...list, item])
  }

  const [list, setList] = useState(initialList)

  return { list, addListItem }
}
