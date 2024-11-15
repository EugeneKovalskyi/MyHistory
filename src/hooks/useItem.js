import { useState } from "react"

export default function useItem() {

	function getCurrentItem(item) {
		setCurrentItem(item)
	}

	function resetCurrentItem() {
		setCurrentItem(null)
	}

	const [currentItem , setCurrentItem] = useState(null)

	return { currentItem, getCurrentItem, resetCurrentItem }
}