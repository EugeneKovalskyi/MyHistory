import { useState } from "react"

export default function useItem() {

	function getCurrentItem(item) {
		setCurrentItem(item)
	}

	const [currentItem , setCurrentItem] = useState(null)

	return { currentItem, getCurrentItem }
}