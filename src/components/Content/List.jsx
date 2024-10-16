import Event from './Event'

const styles = {
  Content: 'mt-12 grid grid-cols-2 gap-8 text-sky-900',
}

export default function List({ eventList }) {
  return (
    <div
      className={styles.Content}
      role='eventList'
    >
      {
				eventList.map((event, index) => (
        	<Event
          	key={index}
          	event={event}
        	/>
      	))
			}
    </div>
  )
}

