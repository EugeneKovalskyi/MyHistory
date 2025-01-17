import { useEffect } from 'react'
import clsx from 'clsx'

import useForm from '@/hooks/useForm'
import useFormValidation from '@/hooks/useFormValidation'

import Day from './Day'
import Title from './Title'
import Description from './Description'
import Upload from './Upload/Upload'
import Tags from './Tags'

export default function Form({
  hideForm,
  addListItem,
  updateListItem,
  removeListItem,
  currentItem,
}) {

  function submitForm() {
    if (currentItem) updateListItem(formData)
    else addListItem(formData)

    hideForm()
  }

  const {
    isFormValid,
    isDayValid,
    validateDay,
    isTitleValid,
    validateTitle,
  } = useFormValidation(currentItem)

  const {
    formData,
    inputText,
    addPhotos,
    removePhoto,
    uploadErrorMessage,
    fillFormWithCurrentItemData,
  } = useForm()

  useEffect(() => {
    if (currentItem) fillFormWithCurrentItemData(currentItem)
  }, [currentItem])

  return (
    <div className='z-10 fixed top-0 left-0 min-h-screen w-full backdrop-blur-sm bg-black/50'>
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form name='form'>
          <Day
            inputText={inputText}
            isDayValid={isDayValid}
            validateDay={validateDay}
            currentItem={currentItem}
          />
          <Title
            inputText={inputText}
            isTitleValid={isTitleValid}
            validateTitle={validateTitle}
            currentItem={currentItem}
          />
          <Description
            inputText={inputText}
            currentItem={currentItem}
          />
          <Upload
            photos={formData.photos}
            addPhotos={addPhotos}
            removePhoto={removePhoto}
            uploadErrorMessage={uploadErrorMessage}
          />
          <Tags
            inputText={inputText}
            currentItem={currentItem}
          />

          <div className='mt-16 flex justify-between'>
            <Cancel hideForm={hideForm} />

            <Remove
              hideForm={hideForm}
              removeListItem={removeListItem}
              currentItem={currentItem}
            />

            <Submit
              submitForm={submitForm}
              disabled={!isFormValid}
              currentItem={currentItem}
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

function Remove({ hideForm, removeListItem, currentItem}) {
  return (
    <button 
      className={clsx('px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 transition-all duration-150 hover:bg-sky-50/25 focus:bg-sky-50/25', !currentItem && 'hidden')}
      onClick={() => {
        removeListItem(currentItem)
        hideForm()
      }}
    >
      Удалить
    </button>
  )
}

function Submit({ submitForm, disabled, currentItem }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 hover:bg-emerald-400 focus:bg-emerald-400 transition-all duration-150',
        disabled && '!bg-gray-400'
      )}
      disabled={disabled}
      onClick={submitForm}
    >
      { currentItem ? 'Сохранить' : 'Добавить' }
    </button>
  )
}
