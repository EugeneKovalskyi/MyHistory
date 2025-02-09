import { useEffect, useId, useRef } from 'react'

export default function Date({ inputText, isDateValid, validateDate, currentItem }) {
  const id = useId()
  const dateRef = useRef()

  useEffect(() => {
    if (currentItem) dateRef.current.value = currentItem.date
  }, [currentItem])

  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        { 
          isDateValid ? 'Дата *' 
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
        name='date'
        ref={dateRef}
        onChange={inputText}
        onBlur={validateDate}
      />
    </div>
  )
}
