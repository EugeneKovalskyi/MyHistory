import { useState } from "react"

export default () => {
	const [updatedEvent , setUpdatedEvent] = useState(null)
	
	function resetUpdatedEvent() {
		setUpdatedEvent(null)
	}

	return { updatedEvent, setUpdatedEvent, resetUpdatedEvent }
}