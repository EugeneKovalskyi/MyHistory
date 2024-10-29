import Item from './Item'

export default function List({ list, showForm, getCurrentItem }) {
  return (
    <div
      className='mt-12 grid grid-cols-2 gap-8 text-sky-900'
    >
      {
				list.map((item, index) => (
        	<Item
          	key={index}
          	item={item}
						showForm={showForm}
						getCurrentItem={getCurrentItem}
        	/>
      	))
			}
    </div>
  )
}

