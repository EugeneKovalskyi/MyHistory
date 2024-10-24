import { useState } from "react"

export default function useForm() {
 
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

  function clearFormData() {
    setFormData({
      day: '',
      title: '',
      description: '',
      photos: [],
      tags: ''
    })
  }
  
	const [formData, setFormData] = useState({
    day: '',
    title: '',
    description: '',
    photos: [],
    tags: ''
  })

  return {
    formData,
    clearFormData,
		inputText,
    uploadPhotos
  }
}