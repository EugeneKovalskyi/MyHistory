const busboy = require('busboy')
const tempErrorHandler = require('../../middleware/tempErrorHandler')
const parseUrl = require('../../middleware/parseUrl')
const { createEvent } = require('../../models/EventModel')

module.exports = async (req, res) => {
	const userId = parseUrl(req.url).searchParams.get('userId')
	const bb = busboy({ headers: req.headers })
	const event = { photos: [] }
	const buffers = {}

	bb.on('error', tempErrorHandler)
	bb.on('file', (id, file) => {
		const chunks = []
	
		file.on('error', tempErrorHandler)
		file.on('data', chunk => chunks.push(chunk))
		file.on('end', () => buffers[id] = Buffer.concat(chunks))
	})
	bb.on('field', (name, value) => {
		if (name === 'photos') 
			event.photos.push(JSON.parse(value))
		else 
			event[name] = value
	})
	bb.on('finish', async () => {
		for (const photo of event.photos) {
			photo.buffer = buffers[photo.id]
		}

		const ids = await createEvent(event, userId)
		
		res.writeHead(201, {
			'Content-Type': 'application/json',
		})
		res.end(JSON.stringify(ids)) 
	})

	req.pipe(bb)
}