const dotenv = require('dotenv')
const http = require('http')
dotenv.config()

const PORT = process.env.PORT

const parseUrl = require('./middleware/parseUrl')
const router = require('./Router')
const eventsController = require('./controllers/EventsController')

router.post('/events', eventsController.post)
router.get('/events', eventsController.get)
router.patch('/events', eventsController.patch)
router.delete('/events', eventsController.delete)
router.get('/events/photos', eventsController.get)

const server = http.createServer((req, res) => {
	const method = req.method
	const { pathname } = parseUrl(req.url)
	
	try { 
		router.emit(method + pathname, req, res) 
	}
	catch(error) { 
		console.log(error) 
	}
})

server.listen(PORT, (error) => {
	if (error) console.log(error)
	else console.log(`Server started on PORT = ${PORT}`)
})