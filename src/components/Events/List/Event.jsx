import Image from 'next/image'
import Link from 'next/link'

export default function Event({ event, showForm, setUpdatedEvent }) {
  return (
    <div className='px-10 py-6 rounded-xl shadow-lg bg-sky-200 transition-all duration-200 hover:bg-sky-300'>
      
      <Date date={event.date} />
      <Title title={event.title} />

      {/* { !!event.photos.length && <Photos photos={event.photos} /> } */}
      { !!event.description && <Description description={event.description} /> }
      { !!event.tags && <Tags tags={event.tags} /> }

      <Edit 
        event={event} 
        showForm={showForm}
        setUpdatedEvent={setUpdatedEvent}
      />
    </div>
  )
}

function Date({ date }) {
  return (
    <div className='w-fit mx-auto text-center font-bold'>
      { date }
    </div>
  )
}

function Title({ title }) {
  return (
    <button className='block mx-auto mt-6 text-lg font-bold tracking-wider border-sky-200 transition-all duration-200 border-b-4 rounded-md hover:border-sky-900'>
      { title }
    </button>
  )
}

function Description({ description }) {
  return (
    <div className='mt-6 rounded-lg'>
      {
        (description.length <= 140) 
				? description
				: description.slice(0, 140).concat('... (читать далее ➾)')
      }      
    </div>
  )
}

function Photos({ photos }) {
  return (
    <div className='mt-6 flex items-center justify-center gap-4'>
      {
        photos.map((photo, index) =>
          (index < 4)
          &&
          <Image
            className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-200 hover:scale-110'
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
        tags.split(' ').map(tag => (
          <Link 
            className='mr-2 hover:underline'
            key={tag}
            href={`/events?searchBy=${tag}`}>
            #{tag}
          </Link>
        ))
      }
    </div>
  )
}

function Edit({ event, showForm, setUpdatedEvent }) {
  return (
    <button
      className='block mt-6 mx-auto px-2 py-1 border-2 rounded-lg border-sky-200 transition-all duration-200 hover:border-sky-900 hover:bg-sky-200'
      onClick={() => {
        showForm()
        setUpdatedEvent(event)
      }}
    >
      Редактировать
    </button>
  )
}