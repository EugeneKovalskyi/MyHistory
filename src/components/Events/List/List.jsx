import Item from './Item'

export default function List({ list, showForm, selectItem }) {
  return (
    <div className='mt-12 grid grid-cols-2 gap-8 text-sky-900'>
      {
				list.map((item) => (
        	<Item
          	key={item.id}
          	item={item}
          	showForm={showForm}
          	selectItem={selectItem}
        	/>
      	))
			}
    </div>
  )
}