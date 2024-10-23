import { useState } from "react";

export default function useFormValidation() {
	function validateForm(inputName, isValid) {
		switch(inputName) {
      case 'Day':
        setIsDayValid(isValid)
        break
      case 'Title':
        setIsTitleValid(isValid)
        break
    }
	}

	const [isDayValid, setIsDayValid] = useState(false)
	const [isTitleValid, setIsTitleValid] = useState(false)

	let isFormValid = isDayValid && isTitleValid

	return { isFormValid, validateForm }
}