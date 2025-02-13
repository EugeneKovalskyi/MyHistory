import { useState } from "react"

export default function useToggleForm(deselectItem) {

  function hideForm() {
		setIsFormHidden(true)
		deselectItem()
  }

  function showForm() {
    setIsFormHidden(false)
  }

  const [isFormHidden, setIsFormHidden] = useState(true)

  return { isFormHidden, hideForm, showForm }
}