import Events from '@/components/Events/Events'

export default async function Page() {
  try {
    const eventList = await fetch(`http://localhost:5000/events`)

    return <Events eventList={eventList} />
  } catch(error) {
    console.log(error.message)
  }

}