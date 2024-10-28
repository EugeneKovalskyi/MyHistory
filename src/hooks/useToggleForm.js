import { useState } from "react"

export default function useToggleForm() {
	
		function hideForm() {
			setIsFormHidden(true)
		}

		function showForm() {
			setIsFormHidden(false)
		}

		const [isFormHidden, setIsFormHidden] = useState(true)

		return { isFormHidden, hideForm, showForm }
}