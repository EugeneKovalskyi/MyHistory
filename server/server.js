const dotenv = require('dotenv')
const http = require('http')
const path = require('path')
dotenv.config()

const eventsController = require('./controllers/EventsController')

const PORT = process.env.PORT || 5001
const baseURL = `http://localhost:${PORT}`

const server = http.createServer((req, res) => {
	const method = req.method
	const parsedUrl = new URL(req.url, baseURL)
	const pathname = parsedUrl.pathname
	const searchParams = parsedUrl.searchParams

	if (pathname === '/events') {
		if (method === 'GET') {
			const userId = searchParams.get('userId')

			eventsController.get(res, userId)
		} 

		else if (method === 'POST') {
			const userId = searchParams.get('userId')
			eventsController.post(req, res, userId)
		}

		else if (method === 'PATCH') {
			const eventId = searchParams.get('eventId')

			eventsController.patch(req, res, eventId)
		}

		else if(method === 'DELETE') {
			const eventId = searchParams.get('eventId')

			eventsController.delete(res, eventId)
		}

	} else res.end()
})

server.listen(PORT, (error) => {
	if (error) console.log(error)
	else console.log(`Server started on PORT = ${PORT}`)
})