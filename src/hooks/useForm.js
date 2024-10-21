import { useState } from "react"

export default function useForm({ addListItem, closeForm }) {
  function inputText(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function uploadPhotos(photos) {
    setFormData({
      ...formData,
      photos,
    })
  }

  function publishEvent() {
    addListItem(formData)
    closeForm()
  }

	const [formData, setFormData] = useState({
    day: '',
    title:'',
    description: '',
    photos: {},
    tags: ''
  })

  return {
    publishEvent,
		inputText,
    uploadPhotos,
  }
}