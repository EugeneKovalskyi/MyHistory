const parseUrl = require('#middleware/parseUrl')
const { deleteEvent } = require('#models/EventModel')

module.exports = async (req, res) => {
	const params = parseUrl(req.url).searchParams
  const userId = params.get('userId')
  const eventId = params.get('eventId')

  await deleteEvent(eventId, userId)
	
  res.statusCode = 204
  res.end()
}
