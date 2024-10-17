import Image from 'next/image'

import editSrc from './edit.svg'
import shareSrc from './share.svg'

const styles = {
  Event:
    'px-10 py-6 rounded-xl shadow-lg bg-sky-200 transition-all duration-150 hover:scale-105 hover:bg-sky-300',
  Tools: 'flex items-center justify-between',
  Title:
    'block mx-auto mt-4 px-2 py-1 rounded-lg text-lg font-bold border-2 border-sky-900 transition-all duration-150 hover:bg-sky-300 hover:border-white hover:text-white',
  Photos: 'mt-6 flex items-center justify-center gap-4',
  PhotosImage:
    'max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-110',
}

export default function EventItem({ event }) {
  return (
    <div className={styles.Event}>
      <Tools />
      <Day day={event.day} />
      <Title title={event.title} />
      <Photos photos={event.photos} />
      <Description description={event.description} />
      <Tags tags={event.tags} />
    </div>
  )
}

function Tools() {
  return (
    <div className={styles.Tools}>
      <button>
        <Image
          className='h-6 w-6'
          src={editSrc}
          alt='edit'
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
  return <div className='text-center font-bold'>{day}</div>
}

function Title({ title }) {
  return <button className={styles.Title}>{title}</button>
}

function Photos({ photos }) {
  return (
    <div className={styles.Photos}>
      <Image
        className={styles.PhotosImage}
        src={photos.src}
        alt={photos.alt}
      />
      <Image
        className={styles.PhotosImage}
        src={photos.src}
        alt={photos.alt}
      />
      <Image
        className={styles.PhotosImage}
        src={photos.src}
        alt={photos.alt}
      />
      <Image
        className={styles.PhotosImage}
        src={photos.src}
        alt={photos.alt}
      />
    </div>
  )
}

function Description({ description }) {
  return (
    <div className='mt-4 rounded-lg'>
      {description}
      <hr className='mt-6 border-sky-900' />
    </div>
  )
}

function Tags({ tags }) {
  return <div className='mt-4'>{tags.join(' ')}</div>
}
