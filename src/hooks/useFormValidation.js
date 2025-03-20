export default () => {
  function validateForm(formData) {
    if (!formData.title) return false
    if (!formData.date) return false

    return true
  }

  return validateForm
}