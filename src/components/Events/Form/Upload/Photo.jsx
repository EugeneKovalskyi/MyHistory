import { useState } from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import garbageSrc from '@/public/garbage.svg'

export default function Photo({ photo, deletePhoto }) {
  
  const [isMouseEnter, setIsMouseEnter] = useState(false)

  return (
    <div
      className='relative cursor-pointer'
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      onClick={() => deletePhoto(photo.id)}
      role='photo'
    >
      <Image
        className='max-w-28 max-h-28 rounded-md shadow-lg shadow-black/25'
        src={photo.src}
        alt={photo.name}
        width={photo.width}
        height={photo.height}
      />

      <div
        className={clsx(
          isMouseEnter ? 'opacity-100' : 'opacity-0',
          'absolute top-0 left-0 w-full h-full rounded-md bg-black/50 transition-all duration-150'
        )}
      >
        <Image
          className='w-1/3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2'
          src={garbageSrc}
          alt='Garbage'
        />
      </div>
    </div>
  )
}
