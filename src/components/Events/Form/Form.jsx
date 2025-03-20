import { useEffect } from 'react'
import clsx from 'clsx'

import useForm from '@/hooks/useForm'
import useFormValidation from '@/hooks/useFormValidation'

import Date from './Date'
import Title from './Title'
import Description from './Description'
import Upload from './Upload/Upload'
import Tags from './Tags'

export default function Form({
  addEvent,
  updateEvent,
  deleteEvent,
  hideForm,
  updatedEvent
}) {

  const validateForm = useFormValidation()
  const {
    formData,
    getDataToUpdate,
    uploadErrorMessage,
    inputText,
    fillFormWithUpdatedEvent,
    addPhotos,
    deletePhoto
  } = useForm(updatedEvent)
  const submit = (e) => {
    e.preventDefault()
    
    if (!validateForm(formData)) return

    if (updatedEvent) 
      updateEvent(getDataToUpdate(), updatedEvent.id)
    else 
      addEvent(formData)

    hideForm()
  }

  useEffect(() => {
    if (updatedEvent) fillFormWithUpdatedEvent()
  }, [updatedEvent])

  return (
    <div className='z-10 fixed top-0 left-0 min-h-screen w-full backdrop-blur-sm bg-black/50'>
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form 
          data-testid='form' 
          onSubmit={submit}
        >
          <Date
            inputText={inputText}
            date={updatedEvent?.date}
          />
          <Title
            inputText={inputText}
            title={updatedEvent?.title}
          />
          <Description
            inputText={inputText}
            description={updatedEvent?.description}
          />
          <Upload
            photos={formData.photos}
            addPhotos={addPhotos}
            deletePhoto={deletePhoto}
            uploadErrorMessage={uploadErrorMessage}
          />
          <Tags
            inputText={inputText}
            tags={updatedEvent?.tags}
          />

          <div className='mt-16 flex justify-between'>
            <Cancel hideForm={hideForm} />

            <Delete
              hideForm={hideForm}
              deleteEvent={deleteEvent}
              eventId={updatedEvent?.id}
            />

            <Submit updatedEvent={updatedEvent} />
          </div>
        </form>
      </div>
    </div>
  )
}

function Cancel({ hideForm }) {
  return (
    <button
      data-testid='formCancel'
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/75 transition-all duration-150 hover:bg-rose-400 focus:bg-rose-400'
      onClick={hideForm}
    >
      Отменить
    </button>
  )
}

function Delete({ hideForm, deleteEvent, eventId}) {
  return (
    <button 
      data-testid='formDelete'
      className={clsx('px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 transition-all duration-150 hover:bg-sky-50/25 focus:bg-sky-50/25', !eventId && 'hidden')}
      onClick={() => {
        deleteEvent(eventId)
        hideForm()
      }}
    >
      Удалить
    </button>
  )
}

function Submit({ updatedEvent }) {
  return (
    <button
      data-testid='formSubmit'
      className={clsx(
        'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 hover:bg-emerald-400 focus:bg-emerald-400 transition-all duration-150'
      )}
      type='submit'
    >
      { updatedEvent ? 'Сохранить' : 'Добавить' }
    </button>
  )
}