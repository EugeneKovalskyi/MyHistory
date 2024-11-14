import { useId } from 'react'
import Image from 'next/image'

import addSrc from '@/public/add.svg'

import Photo from './Photo'

export default function Upload({
  photos,
  addPhotos,
  removePhoto,
  uploadErrorMessage,
}) {

  const id = useId()

  return (
    <div className='w-full mt-10'>
      <Title 
        id={id} 
        uploadErrorMessage={uploadErrorMessage} 
      />

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
    </div>
  )
}

function Title({ id, uploadErrorMessage }) {
  return (
    <label
      className='font-bold text-xl text-sky-50'
      htmlFor={id}
    >
      Фотографии
      { 
        uploadErrorMessage 
        && 
        <span className='ml-4 text-rose-700'>
          ⚠ { uploadErrorMessage } ⚠
        </span>
      } 
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

function Add({ id, photosCount }) {
  return (
    <label htmlFor={id}>
      {
        photosCount < 10 
        && 
        (<Image
          className='w-20 h-20 rounded-xl border-2 shadow-md shadow-black/25 cursor-pointer transition-all duration-150 hover:scale-110'
          src={addSrc}
          alt='Upload photo'
        />)
      }
    </label>
  )
}
