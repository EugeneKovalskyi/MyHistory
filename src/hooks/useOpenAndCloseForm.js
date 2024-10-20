import { useState } from 'react'

export default function useOpenAndCloseForm() {
  function openForm() {
    setIsOpened(true)
  }

  function closeForm() {
    setIsOpened(false)
  }

  const [isOpened, setIsOpened] = useState(false)

  return { isOpened, openForm, closeForm }
}
