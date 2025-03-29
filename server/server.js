const dotenv = require('dotenv')
dotenv.config()
const http = require('http')
const parseUrl = require('./middleware/parseUrl')
const router = require('./router')
const eventsController = require('./controllers/EventController')

const PORT = process.env.PORT

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

router.post('/events', eventsController.post)
router.get('/events', eventsController.get)
router.patch('/events', eventsController.patch)
router.delete('/events', eventsController.delete)
router.get('/events/photos', eventsController.get)