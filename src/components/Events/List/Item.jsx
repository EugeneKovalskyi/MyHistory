import Image from 'next/image'
import Link from 'next/link'

import editSrc from '@/public/edit.svg'
import shareSrc from '@/public/share.svg'

export default function Item({ item, showForm, getCurrentItem }) {
  return (
    <div className='px-10 py-6 rounded-xl shadow-lg bg-sky-200 transition-all duration-150 hover:bg-sky-300'>
      <Tools
        item={item}
        showForm={showForm}
        getCurrentItem={getCurrentItem}
      />

      <Day day={item.day} />
      <Title title={item.title} />

      { !!item.photos.length && <Photos photos={item.photos} /> }
      { !!item.description && <Description description={item.description} /> }
      { !!item.tags && <Tags tags={item.tags} /> }
    </div>
  )
}

function Tools({ item, showForm, getCurrentItem }) {
  return (
    <div className='flex items-center justify-between'>

      <button>
        <Image
          className='h-6 w-6'
          src={editSrc}
          alt='edit'
          onClick={() => {
            showForm()
            getCurrentItem(item)
          }}
        />
      </button>

      <button>
        <Image
          className='h-6 w-6'
          src={shareSrc}
          alt='share'
        />
      </button>

    </div>
  )
}

function Day({ day }) {
  return (
    <div className='w-fit mx-auto -mt-6 text-center font-bold'>
      { day && day.split('-').reverse().join(' . ') }
    </div>
  )
}

function Title({ title }) {
  return (
    <button className='block mx-auto mt-6 text-lg font-bold border-sky-200 transition-all duration-150 border-b-4 rounded-md hover:border-sky-900'>
      { title }
    </button>
  )
}

function Description({ description }) {
  return (
    <div className='mt-4 rounded-lg'>
      {
        description.length <= 140 ? 
          description : 
          description.slice(0, 140).concat('... (читать далее ➾)')
      }      
    </div>
  )
}

function Photos({ photos }) {
  return (
    <div className='mt-6 flex items-center justify-center gap-4'>
      {
        photos.map((photo, index) =>
          index < 4
          &&
          <Image
            className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-110'
            key={index}
            src={photo.src}
            alt={photo.alt}
            width={photo.width}
            height={photo.height}
          />
        ) 
      }
    </div>
  )
}

function Tags({ tags }) {
  return (
    <div className='mt-4'>
      <hr className='mb-4 border-sky-900' />
      {
        tags.map((tag, index) => (
          <Link 
            className='mr-2 hover:underline'
            key={index}
            href={`/events?searchBy=${tag}`}>
            #{tag}
          </Link>
        ))
      }
    </div>
  )
}
