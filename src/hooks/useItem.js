import { useState } from "react"

export default function useItem() {

	function getCurrentItem(item) {
		setCurrentItem(item)
	}

	function clearCurrentItem() {
		setCurrentItem(null)
	}

	const [currentItem , setCurrentItem] = useState(null)

	return { currentItem, getCurrentItem, clearCurrentItem }
}