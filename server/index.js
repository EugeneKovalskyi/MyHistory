let data = [
  {
    "id": 1,
    "day": "30.12.2023",
    "title": "Приютили кошку",
    "photos": [],
    "description": "Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)",
    "tags": ["кошка", "животные"]
  },
  {
    "id": 2,
    "day": "30.08.2024",
    "title": "Выкопали картошку",
    "photos": [],
    "description": "Выкопали 11 рядов картошки за 6 часов. Хоть лето было без дождей, благодаря хорошему поливу урожай очень хороший: 2 ведра/ряд, крупная, вкусная. В основном красная, немного белой и красной гире-образной.",
    "tags": ["огород", "картошка"]
  },
  {
    "id": 3,
    "day": "31.10.2024",
    "title": "Купил беспроводную мышь HATOR",
    "photos": [],
    "description": "Беспроводная мышка HATOR Quasar Ultra 4K Wireless. Стоимость: 3000 грн. В момент первого подключения была заряжена приблизително на 75%. 16.11.2024: Уже неделю мигает колесико указывая на низкий заряд, но работает до сих пор.",
    "tags": ["пк", "покупки"]
  },
  {
    "id": 4,
    "day": "16.11.2024",
    "title": "Посадили фруктовые деревья",
    "photos": [],
    "description": "Купили 10 сажанцев за 1700 грн. По 2 сажанца каждого вида дерева: Абрикос, Персик, Слива, Груша, Яблоко",
    "tags": ["деревья", "фрукты", "сад", "покупки"]
  }
]

const dotenv = require('dotenv')
const http = require('http')
const path = require('path')
dotenv.config()

const PORT = process.env.PORT || 5000
const baseURL = 'http://localhost:5000'

const server = http.createServer((req, res) => {
	const parsedURL = new URL(req.url, baseURL)
	const params = Object.fromEntries(parsedURL.searchParams)
	const pathname = parsedURL.pathname
	const method = req.method

	if (pathname === '/events') {
		const stringifiedData = JSON.stringify(data)
		
		res.writeHead(200, {
			'Content-Type': 'application/json',
		})
		res.write(stringifiedData)
		res.end()

	} else res.end()
})

server.listen(PORT, (error) => {
	if (error) console.log(error)
	else console.log(`Server started on PORT = ${PORT}`)
})
