import { useState } from "react"

export default function useToggleForm(resetCurrentItem) {

  function hideForm() {
		setIsFormHidden(true)
		resetCurrentItem()
  }

  function showForm() {
    setIsFormHidden(false)
  }

  const [isFormHidden, setIsFormHidden] = useState(true)

  return { isFormHidden, hideForm, showForm }
}