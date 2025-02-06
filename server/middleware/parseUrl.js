const baseUrl = `http://localhost:${process.env.PORT}`

module.exports = (url) => {
		return new URL(url, baseUrl)
}
