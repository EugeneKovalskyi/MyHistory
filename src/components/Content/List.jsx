import EventItem from './EventItem'

export default function List({ list }) {
  return (
    <div
      className='mt-12 grid grid-cols-2 gap-8 text-sky-900'
    >
      {
				list.map((item, index) => (
        	<EventItem
          	key={index}
          	item={item}
        	/>
      	))
			}
    </div>
  )
}

