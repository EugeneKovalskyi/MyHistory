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
  updatedEvent,
  hideForm,
  addEvent,
  updateEvent, 
  deleteEvent,
}) {

  const {
    isFormValid,
    isDateValid,
    isTitleValid,
    validateDate,
    validateTitle,
  } = useFormValidation(updatedEvent)

  const {
    formData,
    getDataToUpdate,
    uploadErrorMessage,
    inputText,
    fillFormWithUpdatedEvent,
    addPhotos,
    deletePhoto
  } = useForm(updatedEvent)

  const submitForm = () => {
    if (updatedEvent) updateEvent(getDataToUpdate(), updatedEvent.id)
    else addEvent(formData)

    hideForm()
  }

  useEffect(() => {
    if (updatedEvent) fillFormWithUpdatedEvent()
  }, [updatedEvent])

  return (
    <div className='z-10 fixed top-0 left-0 min-h-screen w-full backdrop-blur-sm bg-black/50'>
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form name='form'>
          <Date
            inputText={inputText}
            isDateValid={isDateValid}
            validateDate={validateDate}
            date={updatedEvent?.date}
          />
          <Title
            inputText={inputText}
            isTitleValid={isTitleValid}
            validateTitle={validateTitle}
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

            <Remove
              hideForm={hideForm}
              deleteEvent={deleteEvent}
              eventId={updatedEvent?.id}
            />

            <Submit
              submitForm={submitForm}
              disabled={!isFormValid}
              updatedEvent={updatedEvent}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

function Cancel({ hideForm }) {
  return (
    <button
      className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/75 transition-all duration-150 hover:bg-rose-400 focus:bg-rose-400'
      onClick={hideForm}
    >
      Отменить
    </button>
  )
}

function Remove({ hideForm, deleteEvent, eventId}) {
  return (
    <button 
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

function Submit({ submitForm, disabled, updatedEvent }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 hover:bg-emerald-400 focus:bg-emerald-400 transition-all duration-150',
        disabled && '!bg-gray-400'
      )}
      disabled={disabled}
      onClick={submitForm}
    >
      { updatedEvent ? 'Сохранить' : 'Добавить' }
    </button>
  )
}