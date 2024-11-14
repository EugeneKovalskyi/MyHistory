import searchSrc from '@/public/search.svg'
import sortSrc from '@/public/sort.svg'

import Image from 'next/image'

export default function Tools({ showForm }) {
  return (
    <div className='flex items-center justify-between'>
      <Search />
      <ShowForm showForm={showForm} />
      <Sort />
    </div>
  )
}

function Search() {
  return (
    <div className='w-2/5 px-6 py-4 flex gap-5 rounded-xl shadow-lg bg-sky-600'>
      <input
        className='px-3 grow rounded-lg bg-slate-100 transition-all duration-150 focus:ring focus:ring-inset focus:ring-sky-400 focus:bg-white hover:bg-white'
        type='text'
        placeholder='Искать...'
      />
      <button className='transition-all duration-150 hover:scale-110'>
        <Image
          className='h-9 w-9'
          src={searchSrc}
          alt='search'
        />
      </button>
    </div>
  )
}

function ShowForm({ showForm }) {
  return (
    <button
      className='w-1/6 px-2 py-5 rounded-xl shadow-lg font-bold text-lg text-sky-50 bg-teal-500 transition-all duration-150 hover:shadow-xl hover:bg-teal-400'
      onClick={showForm}
    >
      Добавить событие
    </button>
  )
}

function Sort() {
  return (
    <div className='w-2/5 px-6 py-4 flex gap-5 rounded-lg shadow-xl bg-sky-600'>
      <button className='transition-all duration-150 hover:scale-110'>
        <Image
          className='h-9 w-9'
          src={sortSrc}
          alt='sort'
        />
      </button>
      <select
        className='px-3 grow rounded-lg text-center cursor-pointer bg-slate-100 transition-all duration-150 focus:bg-white hover:bg-white'
        name='criterion'
      >
        <option value='name'>По названию</option>
        <option value='date'>По дате</option>
      </select>
    </div>
  )
}
