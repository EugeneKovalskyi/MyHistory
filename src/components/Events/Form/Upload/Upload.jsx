import { useId } from 'react'
import Image from 'next/image'

import addSrc from '@/public/add.svg'
import Photo from './Photo'

export default function Upload({
  photos,
  addPhotos,
  deletePhoto,
  uploadErrorMessage,
}) {

  const id = useId()

  return (
    <div className='w-full mt-10'>
      <Title uploadErrorMessage={uploadErrorMessage} />

      <Preview
        id={id}
        photos={photos}
        deletePhoto={deletePhoto}
      />

      <input
        data-testid='uploadInput'
        className='-z-50 w-0 h-0'
        id={id}
        type='file'
        name='photos'
        accept='image/*'
        multiple
        onChange={(e) => addPhotos(e.target.files)}
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
        <span className='ml-4 text-rose-700/70'>
          ⚠ { uploadErrorMessage }
        </span>
      } 
    </label>
  )
}

function Preview({ id, photos, deletePhoto }) {
  return (
    <div className='mt-4 flex flex-wrap items-center gap-4'>
      {
        photos.map(photo => (
          <Photo
            photo={photo}
            key={photo.id}
            deletePhoto={deletePhoto}
          />
        ))
      }

      <Add
        id={id}
        photosNumber={photos.length}
      />
    </div>
  )
}

function Add({ id, photosNumber }) {
  return (
    <label htmlFor={id}>
      {
        (photosNumber < 10) 
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
