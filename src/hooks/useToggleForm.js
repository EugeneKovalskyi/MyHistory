import { useState } from "react"

export default resetUpdatedEvent => {
  const [isFormHidden, setIsFormHidden] = useState(true)

  function hideForm() {
		setIsFormHidden(true)
		resetUpdatedEvent()
  }

  function showForm() {
    setIsFormHidden(false)
  }

  return { isFormHidden, hideForm, showForm }
}