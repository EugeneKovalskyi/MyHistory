import { useId } from 'react'

import useForm from '../../../hooks/useForm'
import PhotosUpload from './PhotosUpload'
import ErrorMessage from './ErrorMessage'

export default function Form({ isOpened, closeForm, addListItem }) {

  const { publishEvent, inputText, uploadPhotos } = useForm({ addListItem, closeForm })

  return (
    <div
      className='z-10 fixed top-0 left-0 min-h-screen w-full bg-black/50'
      hidden={!isOpened}
    >
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form name='form'>
          <Day inputText={inputText} />
          <Title inputText={inputText} />
          <Description inputText={inputText} />
          <PhotosUpload uploadPhotos={uploadPhotos} />
          <Tags inputText={inputText} />
        </form>

        <div className='mt-16 flex justify-between'>
          <Cancel closeForm={closeForm} />
          <Submit publishEvent={publishEvent} />
        </div>
      </div>
    </div>
  )
}

function Day({ inputText }) {
  const id = useId()

  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Дата *
      </label>
      { error.cause === 'EMPTY_DAY' && <ErrorMessage message='Введите дату' />}

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='date'
        name='day'
        onChange={inputText}
      />
    </div>
  )
}

function Title({ inputText }) {
  const id = useId()

  return (
    <div className='mt-10 text-center '>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Название *
      </label>
      {/* { errorCause === 'EMPTY_TITLE' && <ErrorMessage message='Введите название' />} */}

      <input
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        maxLength={50}
        onChange={inputText}
      />
    </div>
  )
}

function Description({ inputText }) {
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
        onChange={inputText}
      />
    </div>
  )
}

function Tags({ inputText }) {
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
        onChange={inputText}
      />
    </div>
  )
}

function Cancel({ closeForm }) {
  return (
    <button
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/75 transition-all duration-150 hover:bg-rose-400 focus:bg-rose-400'
      onClick={closeForm}
    >
      Отменить
    </button>
  )
}

function Submit({ publishEvent }) {
  return (
    <button
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 transition-all duration-150 hover:bg-emerald-400 focus:bg-emerald-400'
      onClick={publishEvent}
    >
      Добавить
    </button>
  )
}