import { HOST } from '@/constants'

export default async (eventId, userId) => {
	try {
		await fetch(`${HOST}/events?userId=${userId}&eventId=${eventId}`, {
			method: 'DELETE',
		})

	} catch (error) {
		console.log(error)
	}
}