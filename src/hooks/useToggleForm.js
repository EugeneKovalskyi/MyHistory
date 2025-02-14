import { useState } from "react"

export default (resetUpdatedEvent) => {

  function hideForm() {
		setIsFormHidden(true)
		resetUpdatedEvent()
  }

  function showForm() {
    setIsFormHidden(false)
  }

  const [isFormHidden, setIsFormHidden] = useState(true)

  return { isFormHidden, hideForm, showForm }
}