import { useEffect, useId, useRef, useState } from 'react'

export default function Day({ inputText, isFormHidden, validateForm, currentItem }) {

  function validateDay(e) {
    if (e.target.value.trim() === '') {
      validateForm('Day', false)
      setIsDayValid(false)
    } else {
      validateForm('Day', true)
      setIsDayValid(true)
    }
  }

  const id = useId()
  const dayRef = useRef()
  const [isDayValid, setIsDayValid] = useState(true)

  useEffect(() => {
    if (currentItem) {
      dayRef.current.value = currentItem.day
      validateForm('Day', true)
    }

    if (isFormHidden) setIsDayValid(true)

  }, [currentItem, isFormHidden])


  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        { 
          isDayValid ? 'Дата *' 
          : 
          <span className='text-rose-700'>
            ⚠ Введите дату ⚠
          </span>
        }
      </label>

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='date'
        name='day'
        ref={dayRef}
        onChange={inputText}
        onBlur={validateDay}
      />
    </div>
  )
}
