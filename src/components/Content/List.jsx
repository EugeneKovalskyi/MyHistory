import EventItem from './EventItem'

const styles = {
  List: 'mt-12 grid grid-cols-2 gap-8 text-sky-900',
}

export default function List({ eventList }) {
  return (
    <div
      className={styles.List}
    >
      {
				eventList.map((item, index) => (
        	<EventItem
          	key={index}
          	item={item}
        	/>
      	))
			}
    </div>
  )
}

