import { useEffect, useId, useRef } from 'react'
import clsx from 'clsx'

import useForm from '../../../hooks/useForm'
import useFormValidation from '../../../hooks/useFormValidation'
import Day from './Day'
import Title from './Title'
import Upload from './Upload'

export default function Form({
  isFormHidden,
  hideForm,
  addListItem,
  updateListItem,
  currentItem,
  clearCurrentItem,
}) {

  function closeForm() {
    hideForm()
    clearFormData()
    clearFormValidation()
    clearCurrentItem()
    formRef.current.reset()
  }

  function submitForm() {
    if (currentItem) updateListItem(formData)
    else addListItem(formData)

    closeForm()
  }

  const formRef = useRef(null)
  const { isFormValid, validateForm, clearFormValidation } = useFormValidation()
  const {
    formData,
    clearFormData,
    inputText,
    addPhotos,
    removePhoto,
    uploadErrorMessage,
    setFormDataWithCurrentItemData,
  } = useForm()

  useEffect(() => {
    if (currentItem) setFormDataWithCurrentItemData(currentItem)
  }, [currentItem])

  return (
    <div
      className='z-10 fixed top-0 left-0 min-h-screen w-full backdrop-blur-sm bg-black/50'
      hidden={isFormHidden}
    >
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form
          name='form'
          ref={formRef}
        >
          <Day
            inputText={inputText}
            isFormHidden={isFormHidden}
            validateForm={validateForm}
            currentItem={currentItem}
          />
          <Title
            inputText={inputText}
            isFormHidden={isFormHidden}
            validateForm={validateForm}
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
        </form>

        <div className='mt-16 flex justify-between'>
          <Cancel closeForm={closeForm} />

          { currentItem && <Remove currentItem={currentItem} /> }

          <Submit
            submitForm={submitForm}
            disabled={!isFormValid}
            currentItem={currentItem}
          />
        </div>
      </div>
    </div>
  )
}

function Description({ inputText, currentItem }) {
  const id = useId()
  const descriptionRef = useRef()

  useEffect(() => {
    if (currentItem) descriptionRef.current.value = currentItem.description
  }, [currentItem])

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
        ref={descriptionRef}
        onChange={inputText}
      />
    </div>
  )
}

function Tags({ inputText, currentItem }) {
  const id = useId()
  const tagsRef = useRef()

  useEffect(() => {
    if (currentItem) tagsRef.current.value = currentItem.tags
  }, [currentItem])

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
        ref={tagsRef}
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

function Remove({ currentItem }) {
  return (
    <button className='px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/75 transition-all duration-150 hover:bg-rose-400 focus:bg-rose-400'>
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
