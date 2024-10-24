import { useState } from "react"

export default function useToggleComponent(componentName) {
	if (componentName === 'Form') {
		function hideForm() {
			setIsFormHidden(true)
		}

		function showForm() {
			setIsFormHidden(false)
		}

		const [isFormHidden, setIsFormHidden] = useState(true)

		return { isFormHidden, hideForm, showForm }
	}
}