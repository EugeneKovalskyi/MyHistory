import { useId, useState } from "react"

import ErrorMessage from './ErrorMessage'

export default function Title({ inputText, validateForm }) {
  function validateInput(e) {
    if (e.target.value.trim() === '') {
      validateForm('Title', false)
      setIsValid(false)
    }
    else {
      validateForm('Title',true)
      setIsValid(true)
    }
  }
  
  const id = useId()
  const [isValid, setIsValid] = useState(true)

  return (
    <div className='mt-10 text-center '>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Название *
      </label>
      { !isValid && <ErrorMessage message='Введите название' />}

      <input
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        maxLength={50}
        onChange={inputText}
        onBlur={validateInput}
      />
    </div>
  )
}