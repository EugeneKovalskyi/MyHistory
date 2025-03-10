const busboy = require('busboy')
const tempErrorHandler = require('../../middleware/tempErrorHandler')
const parseUrl = require('../../middleware/parseUrl')
const { updateEvent } = require('../../models/EventModel')

module.exports = async (req, res) => {
	const params = parseUrl(req.url).searchParams
    const userId = params.get('userId')
    const eventId = params.get('eventId')
    const bb = busboy({ headers: req.headers })
    const dataToUpdate = { photosToInsert: [] }
    const buffers = {}

    bb.on('error', tempErrorHandler)
    bb.on('file', (id, file) => {
			const chunks = []
		
			file.on('error', tempErrorHandler)
			file.on('data', chunk => chunks.push(chunk))
			file.on('end', () => buffers[id] = Buffer.concat(chunks))
		})
    bb.on('field', (name, value) => {
			switch (name) {
				case 'photosToInsert':
					dataToUpdate[name].push(JSON.parse(value)) 
					break
		
				case 'photosToDelete':
					dataToUpdate[name] = JSON.parse(value)
					break
		
				default:
					dataToUpdate[name] = value
			}
		})
    bb.on('finish', async () => {
      for (const photo of dataToUpdate.photosToInsert) {
				photo.buffer = buffers[photo.id]
			}

      const photosIds = await updateEvent(dataToUpdate, eventId, userId)

      res.writeHead(200, {
        'Content-Type': 'application/json',
      })
      res.end(JSON.stringify(photosIds))
    })

    req.pipe(bb)
}