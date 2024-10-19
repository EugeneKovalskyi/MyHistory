import { useState, useId } from 'react'
import getImageDimensions from '../../utils/getImageDimensions'
import Image from 'next/image'
import addSrc from './add.svg'
import { MAX_PHOTOS_COUNT } from '../../utils/constants'

export default function PhotosUpload() {

  async function handlePhotoInput(e) {
    const files = [...e.target.files].slice(0, MAX_PHOTOS_COUNT - photos.length)

    try {
      const pendingPhotos = []

      for (let file of files) {
        if (file.size > 10485760) {
          throw new Error('Файл слишком большой!', { cause: 'TOO_LARGE_FILE' })
        }

        const src = URL.createObjectURL(file)
        const alt = file.name
        const { width, height } = await getImageDimensions(src)

        pendingPhotos.push({
          src,
          alt,
          width,
          height,
        })

        URL.revokeObjectURL(src)
      }

      setPhotos([...photos, ...pendingPhotos])

    } catch (error) {
      if (error.cause === 'UPLOAD_ERROR') {
        setIsUploadFailed(true)
        setTimeout(() => setIsUploadFailed(false), 5000)

      } else if (error.cause === 'TOO_LARGE_FILE') {
        setIsFileTooLarge(true)
        setTimeout(() => setIsFileTooLarge(false), 5000)

      } else {
        console.error(error.message)
      }
    }
  }

  const id = useId()
  const [isFileTooLarge, setIsFileTooLarge] = useState(false)
  const [isUploadFailed, setIsUploadFailed] = useState(false)
  const [photos, setPhotos] = useState([])

  return (
    <div className='w-full mt-10 relative'>

      <Title id={id} />
      <Preview
        id={id}
        photos={photos}
      />

      <input
        className='w-0 h-0'
        id={id}
        type='file'
        name='photos'
        accept='image/*'
        multiple
        onChange={handlePhotoInput}
      />

      {isFileTooLarge && <ErrorMessage message='Размер файла должен быть меньше 10 Мб' />}
      {isUploadFailed && <ErrorMessage message='Файл не удалось загрузить' />}
      
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

function Preview({ id, photos }) {
  return (
    <div className='mt-4 flex flex-wrap items-center gap-4'>
      {
        photos.map((photo, index) => {
          return (
            <div
              className='max-w-28'
              key={index}
            >
              <Image
                className='object-scale-down rounded-md shadow-lg shadow-black/25'
                src={photo.src}
                alt={photo.alt}
                width={photo.width}
                height={photo.height}
              />
            </div>
          )
        })
      }

      <AddPhoto
        id={id}
        photosCount={photos.length}
      />      
    </div>
  )
}

function AddPhoto({ id, photosCount }) {
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
    <div className='absolute w-max px-2 text-lg left-1/2 transform -translate-x-1/2'>
      {message}
    </div>
  )
}