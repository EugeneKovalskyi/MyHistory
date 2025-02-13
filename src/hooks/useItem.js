import { useState } from "react"

export default function useItem() {
	function selectItem(item) {
		setSelectedItem(item)
	}

	function deselectItem() {
		setSelectedItem(null)
	}

	const [selectedItem , setSelectedItem] = useState(null)

	return { selectedItem, selectItem, deselectItem }
}