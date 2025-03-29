import { HOST } from '@/constants'

export default async userId => {
	try {
		const response = await fetch(`${HOST}/events?userId=${userId}`)
		const list = await response.json()

		return list

	} catch (error) {
		console.log(error)
	}
}