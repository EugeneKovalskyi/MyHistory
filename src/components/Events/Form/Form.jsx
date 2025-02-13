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
  hideForm,
  addListItem,
  updateListItem,
  removeListItem,
  selectedItem,
}) {

  function submitForm() {
    if (selectedItem) {
      const dataToUpdate = {}
      console.log(selectedItem)
      console.log(formData)
      for (let prop in selectedItem) {
        if (selectedItem[prop] !== formData[prop]) {
          dataToUpdate[prop] = formData[prop]
        }
      }
      console.log(dataToUpdate)
      
      updateListItem(selectedItem.id, dataToUpdate)

    } else addListItem(formData)

    hideForm()
  }

  const {
    isFormValid,
    isDateValid,
    validateDate,
    isTitleValid,
    validateTitle,
  } = useFormValidation(selectedItem)

  const {
    formData,
    inputText,
    addPhotos,
    removePhoto,
    uploadErrorMessage,
    fillFormWithSelectedItemData,
  } = useForm()

  useEffect(() => {
    if (selectedItem) fillFormWithSelectedItemData(selectedItem)
  }, [selectedItem])

  return (
    <div className='z-10 fixed top-0 left-0 min-h-screen w-full backdrop-blur-sm bg-black/50'>
      <div className='max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500'>
        <form name='form'>
          <Date
            inputText={inputText}
            isDateValid={isDateValid}
            validateDate={validateDate}
            selectedItem={selectedItem}
          />
          <Title
            inputText={inputText}
            isTitleValid={isTitleValid}
            validateTitle={validateTitle}
            selectedItem={selectedItem}
          />
          <Description
            inputText={inputText}
            selectedItem={selectedItem}
          />
          {/* <Upload
            photos={formData.photos}
            addPhotos={addPhotos}
            removePhoto={removePhoto}
            uploadErrorMessage={uploadErrorMessage}
          /> */}
          <Tags
            inputText={inputText}
            selectedItem={selectedItem}
          />

          <div className='mt-16 flex justify-between'>
            <Cancel hideForm={hideForm} />

            <Remove
              hideForm={hideForm}
              removeListItem={removeListItem}
              selectedItemId={selectedItem?.id}
            />

            <Submit
              submitForm={submitForm}
              disabled={!isFormValid}
              selectedItem={selectedItem}
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

function Remove({ hideForm, removeListItem, selectedItemId}) {
  return (
    <button 
      className={clsx('px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 transition-all duration-150 hover:bg-sky-50/25 focus:bg-sky-50/25', !selectedItemId && 'hidden')}
      onClick={() => {
        removeListItem(selectedItemId)
        hideForm()
      }}
    >
      Удалить
    </button>
  )
}

function Submit({ submitForm, disabled, selectedItem }) {
  return (
    <button
      className={clsx(
        'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/75 hover:bg-emerald-400 focus:bg-emerald-400 transition-all duration-150',
        disabled && '!bg-gray-400'
      )}
      disabled={disabled}
      onClick={submitForm}
    >
      { selectedItem ? 'Сохранить' : 'Добавить' }
    </button>
  )
}