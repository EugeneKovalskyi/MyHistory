const dotenv = require('dotenv')
dotenv.config()
const http = require('http')
const parseUrl = require('./middleware/parseUrl')
const router = require('./router')
const EventRoutes = require('./routes/EventRoutes')
const PORT = process.env.PORT

EventRoutes(router)

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