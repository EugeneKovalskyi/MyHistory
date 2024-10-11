import Add from './Add'
import Content from './Content/Content'
import Search from './Search/Search'
import Sort from './Sort/Sort'

export default function List() {
  return (
    <div className='max-w-screen-xl mx-auto mt-16 px-8'>
      <div className=' flex items-center justify-between'>
        <Search />
        <Add />
        <Sort />
      </div>
      
      <Content />
    </div>
  )
}
