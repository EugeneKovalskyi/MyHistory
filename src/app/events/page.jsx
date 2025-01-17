import Events from '@/components/Events/Events'

export default async function Page() {
  const data = await fetch('http://localhost:5000/events')
  const eventList = await data.json()

  return <Events eventList={eventList} />
}