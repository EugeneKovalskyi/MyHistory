import { useId, useState } from "react"

import ErrorMessage from './ErrorMessage'

export default function Day({ inputText, validateForm }) {
	
  function validateDay(e) {
    if (e.target.value.trim() === '') {
      validateForm('Day', false)
      setIsDayValid(false)
    }
    else {
      validateForm('Day',true)
      setIsDayValid(true)
    }
  }
  
  const id = useId()
  const [isDayValid, setIsDayValid] = useState(true)

  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Дата *
      </label>
      { !isDayValid && <ErrorMessage message='Введите дату' />}

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='date'
        name='day'
        onChange={inputText}
        onBlur={validateDay}
      />
    </div>
  )
}