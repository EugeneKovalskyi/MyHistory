module.exports = (date, locale) => {
	return new Date(date).toLocaleDateString(locale)
}