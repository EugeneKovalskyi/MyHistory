import Add from './Add'
import Content from './Content/Content'
import Search from './Search/Search'
import Sort from './Sort/Sort'

export default function List() {
  const styles = {
    'ListContainer': 'max-w-screen-xl mx-auto mt-16 px-8',
    'List': 'flex items-center justify-between'
  }

  return (
    <div className={ styles.ListContainer }>
      <div className={ styles.List }>
        <Search />
        <Add />
        <Sort />
      </div>
      
      <Content />
    </div>
  )
}
