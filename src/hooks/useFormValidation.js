import { useState } from 'react'

export default function useFormValidation(currentItem) {
  function validateDate(e) {
    if (e.target.value.trim() === '') {
      setIsDateValid(false)
      setIsFormValid(false)
    } else {
			setDateDirty(true)
      setIsDateValid(true)
      setIsFormValid(isTitleValid && titleDirty)
    }
  }

  function validateTitle(e) {
    if (e.target.value.trim() === '') {
      setIsTitleValid(false)
      setIsFormValid(false)
    } else {
			setTitleDirty(true)
      setIsTitleValid(true)
      setIsFormValid(isDateValid && dateDirty)
    }
  }

  const [isDateValid, setIsDateValid] = useState(true)
  const [isTitleValid, setIsTitleValid] = useState(true)
	const [dateDirty, setDateDirty] = useState(!!currentItem)
	const [titleDirty, setTitleDirty] = useState(!!currentItem)
  const [isFormValid, setIsFormValid] = useState(!!currentItem)

  return {
    isFormValid,
    isDateValid,
    validateDate,
    isTitleValid,
    validateTitle,
  }
}
