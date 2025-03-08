export default async userId => {
	try {
		const response = await fetch(`http://localhost:5000/events?userId=${userId}`)
		const list = await response.json()

		return list

	} catch (error) {
		console.log(error)
	}
}