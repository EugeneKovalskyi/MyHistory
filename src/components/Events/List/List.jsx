import Event from './Event'

export default function List({ list, showForm, setUpdatedEvent }) {
  return (
    <div className='mt-12 grid grid-cols-2 gap-8 text-sky-900'>
      {
				list.map((event) => (
        	<Event
          	key={event.id}
          	event={event}
          	showForm={showForm}
          	setUpdatedEvent={setUpdatedEvent}
        	/>
      	))
			}
    </div>
  )
}