const parseUrl = require('../../middleware/parseUrl')
const { getEvents, getPhoto } = require('../../models/EventModel')

module.exports = async (req, res) => {
	const params = parseUrl(req.url).searchParams
	const userId = params.get('userId')
	const photoId = params.get('photoId')
	
	if (userId) {
		const userLocale = req.headers['accept-language'].match(/^[a-z]+-[A-Z]+/)[0]
		const events = await getEvents(userId, userLocale)

		res.writeHead(200, { 'Content-Type': 'application/json' })
		res.write(JSON.stringify(events))

	} else if (photoId) {
		const photo = await getPhoto(photoId)

		res.writeHead(200, { 'Content-Type': 'image/*' })
		res.write(photo)

	} else {
		//! Сделать redirect
		console.warn(`Запрос ${req.url} не обрабатывается!`)
	}

	res.end()
}