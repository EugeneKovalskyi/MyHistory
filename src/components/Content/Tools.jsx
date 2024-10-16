import searchSrc from './search.svg'
import sortSrc from './sort.svg'

import Image from 'next/image'

const styles = {
  Tools: 'flex items-center justify-between',
  Search: 'w-2/5 px-6 py-4 flex gap-5 rounded-xl shadow-lg bg-sky-600',
  SearchInput:
    'px-3 grow rounded-lg bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-400 focus:bg-white hover:bg-white',
  SearchButton: 'transition-all duration-150 hover:scale-110',
  Add: 'w-1/6 px-2 py-5 rounded-xl shadow-lg font-bold text-lg text-sky-50 bg-teal-500 transition-all duration-150 hover:shadow-xl hover:bg-teal-400',
  Sort: 'w-2/5 px-6 py-4 flex gap-5 rounded-lg shadow-xl bg-sky-600',
  SortButton: 'transition-all duration-150 hover:scale-110',
  SortSelect:
    'px-3 grow rounded-lg text-center cursor-pointer bg-slate-100 transition-all duration-150 focus:bg-white hover:bg-white',
}

export default function Tools({ addEvent }) {
  return (
    <div className={styles.Tools}>
      <Search />
      <Add addEvent={addEvent} />
      <Sort />
    </div>
  )
}

function Search() {
  return (
    <div className={styles.Search}>
      <input
        className={styles.SearchInput}
        type='text'
        placeholder='Искать...'
      />
      <button className={styles.SearchButton}>
        <Image
          className='h-9 w-9'
          src={searchSrc}
          alt='search'
        />
      </button>
    </div>
  )
}

function Add({ addEvent }) {
  return (
    <button
      className={styles.Add}
      onClick={addEvent}
      role='addEvent'
    >
      Добавить событие
    </button>
  )
}

function Sort() {
  return (
    <div className={styles.Sort}>
      <button className={styles.SortButton}>
        <Image
          className='h-9 w-9'
          src={sortSrc}
          alt='sort'
        />
      </button>
      <select
        className={styles.SortSelect}
        name='criterion'
      >
        <option value='name'>По названию</option>
        <option value='date'>По дате</option>
      </select>
    </div>
  )
}
