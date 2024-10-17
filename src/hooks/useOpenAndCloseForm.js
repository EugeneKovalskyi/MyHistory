import { useState } from 'react'

export default function useOpenAndCloseForm() {
  const [isOpened, setIsOpened] = useState(false)

  return [isOpened, openForm, closeForm]

  function openForm() {
    setIsOpened(true)
  }

  function closeForm() {
    setIsOpened(false)
  }
}
