const eventsController = require('#controllers/EventController')

module.exports = router => {
  router.post('/events', eventsController.post)
  router.get('/events', eventsController.get)
  router.patch('/events', eventsController.patch)
  router.delete('/events', eventsController.delete)
  router.get('/events/photos', eventsController.get)
}