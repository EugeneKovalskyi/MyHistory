import { useState, useId } from 'react'

import PhotosUpload from './PhotosUpload'

export default function Form({ isOpened, closeForm, addEventItem }) {

  function handleUploadPhotos(photos) {
    setFormData({
      ...formData,
      photos
    })
  }

  function handleInputChange(e) {
    const { name, value } = e.target

    setFormData({
      ...formData,
      [name]: value,
    })
  }

  function handleSubmitClick(e) {
    e.preventDefault()

    addEventItem(formData)
    closeForm()
  }

  function handleCancelClick(e) {
    e.preventDefault()

    closeForm()
  }

  const [formData, setFormData] = useState({
    day: null,
    title:null,
    description: null,
    photos: null,
    tags: null
  })

  return (
    <div
      className='z-10 fixed top-0 left-0 min-h-screen w-full bg-black/50'
      hidden={!isOpened}
    >
      <form
        className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'
        name='eventForm'
      >

        <Day handleInputChange={handleInputChange} />
        <Title handleInputChange={handleInputChange} />
        <Description handleInputChange={handleInputChange} />
        <PhotosUpload handleUploadPhotos={handleUploadPhotos} />
        <Tags handleInputChange={handleInputChange} />

        <div className='mt-16 flex justify-between'>
          <Cancel handleCancelClick={handleCancelClick} />
          <Submit handleSubmitClick={handleSubmitClick} />
        </div>
        
      </form>
    </div>
  )
}

function Day({ handleInputChange }) {
  const id = useId()

  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Дата
      </label>

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='date'
        name='day'
        required
        onChange={handleInputChange}
      />
    </div>
  )
}

function Title({ handleInputChange }) {
  const id = useId()

  return (
    <div className='mt-10 text-center '>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Название
      </label>

      <input
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        maxLength={50}
        required
        onChange={handleInputChange}
      />
    </div>
  )
}

function Description({ handleInputChange }) {
  const id = useId()

  return (
    <div className='mt-10'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Подробное описание
      </label>

      <textarea
        className='block w-full mt-4 px-4 py-2 rounded-lg resize-none text-lg bg-slate-100 transition-all duration-150 focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white hover:bg-white'
        id={id}
        type='text'
        name='description'
        rows={5}
        onChange={handleInputChange}
      />
    </div>
  )
}

function Tags({ handleInputChange }) {
  const id = useId()

  return (
    <div className='mt-6'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Теги
      </label>

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='tags'
        maxLength={30}
        placeholder='Ассоциативное слово'
        onChange={handleInputChange}
      />
    </div>
  )
}

function Cancel({ handleCancelClick }) {
  return (
    <button
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/75 transition-all duration-150 hover:bg-rose-400 focus:bg-rose-400'
      onClick={handleCancelClick}
    >
      Отменить
    </button>
  )
}

function Submit({ handleSubmitClick }) {
  return (
    <button
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 transition-all duration-150 hover:bg-emerald-400 focus:bg-emerald-400'
      onClick={handleSubmitClick}
    >
      Добавить
    </button>
  )
}