import { useState } from 'react'

export default function useFormValidation(currentItem) {
  function validateDay(e) {
    if (e.target.value.trim() === '') {
      setIsDayValid(false)
      setIsFormValid(false)
    } else {
			setDayDirty(true)
      setIsDayValid(true)
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
      setIsFormValid(isDayValid && dayDirty)
    }
  }

  const [isDayValid, setIsDayValid] = useState(true)
  const [isTitleValid, setIsTitleValid] = useState(true)
	const [dayDirty, setDayDirty] = useState(!!currentItem)
	const [titleDirty, setTitleDirty] = useState(!!currentItem)
  const [isFormValid, setIsFormValid] = useState(!!currentItem)

  return {
    isFormValid,
    isDayValid,
    validateDay,
    isTitleValid,
    validateTitle,
  }
}
