export default async (eventId, userId) => {
	try {
		await fetch(`http://localhost:5000/events?userId=${userId}&eventId=${eventId}`, {
			method: 'DELETE',
		})

	} catch (error) {
		console.log(error)
	}
}