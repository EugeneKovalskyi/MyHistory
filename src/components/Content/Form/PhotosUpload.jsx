import { useState, useId, useEffect } from 'react'
import clsx from 'clsx'
import Image from 'next/image'

import addSrc from './add.svg'
import garbageSrc from './garbage.svg'

import usePhotosPreview from '../../../hooks/usePhotosPreview'

export default function PhotosUpload({ handleUploadPhotos }) {
  const id = useId()
  const {photos, addPhotos, removePhoto, errorMessage} = usePhotosPreview()

  useEffect(() => {
    handleUploadPhotos(photos)
  }, [photos])

  return (
    <div className='w-full mt-10 relative'>

      <Title id={id} />
      <Preview
        id={id}
        photos={photos}
        removePhoto={removePhoto}
      />

      <input
        className='-z-50 w-0 h-0'
        id={id}
        type='file'
        name='photos'
        accept='image/*'
        multiple
        onChange={addPhotos}
      />

      {errorMessage && <ErrorMessage message={errorMessage} />}
      
    </div>
  )
}

function Title({ id }) {
  return (
    <label
      className='font-bold text-xl text-sky-50'
      htmlFor={id}
    >
      Фотографии
    </label>
  )
}

function Preview({ id, photos, removePhoto }) {
  return (
    <div className='mt-4 flex flex-wrap items-center gap-4'>
      { 
        photos.map((photo, index) => (
          <Photo 
            photo={photo} 
            key={index}
            removePhoto={removePhoto}
          />
        ))
      }

      <Add
        id={id}
        photosCount={photos.length}
      />      
    </div>
  )
}

function Photo({ photo, removePhoto }) {
  const [isMouseEnter, setIsMouseEnter] = useState(false)

  return (
    <div
      className='relative cursor-pointer'
      onMouseEnter={() => setIsMouseEnter(true)}
      onMouseLeave={() => setIsMouseEnter(false)}
      onClick={() => removePhoto(photo)}
    >
      <Image
        className='max-w-28 max-h-28 rounded-md shadow-lg shadow-black/25'
        src={photo.src}
        alt={photo.alt}
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

function Add({ id, photosCount }) {
  return (
    <label htmlFor={id}>
      {
        photosCount < 10 
        && 
        <Image
          className='w-20 h-20 rounded-xl border-2 shadow-md shadow-black/25 cursor-pointer transition-all duration-150 hover:scale-110'
          src={addSrc}
          alt='Upload photo'
        />
      }
    </label>
  )
}

function ErrorMessage({ message }) {
  return (
    <div className='absolute w-max px-2 text-lg left-1/2 -translate-x-1/2'>
      {message}
    </div>
  )
}