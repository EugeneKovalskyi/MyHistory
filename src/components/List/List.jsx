import Search from './Search/Search'
import Add from './Add'
import Sort from './Sort/Sort'

export default function List() {
  return (
    <div className='max-w-screen-xl mx-auto mt-10 px-8 flex items-center justify-between'>
      <Search />
      <Add />
      <Sort />
    </div>
  )
}
