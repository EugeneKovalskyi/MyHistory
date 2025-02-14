import { useState } from "react"

export default () => {
	function resetUpdatedEvent() {
		setUpdatedEvent(null)
	}

	const [updatedEvent , setUpdatedEvent] = useState(null)

	return { updatedEvent, setUpdatedEvent, resetUpdatedEvent }
}