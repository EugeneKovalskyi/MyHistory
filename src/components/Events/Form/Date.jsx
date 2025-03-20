import { useEffect, useId, useRef } from 'react'

export default function Date({ inputText, date }) {
  const id = useId()
  const dateRef = useRef()

  useEffect(() => {
    if (date) {
      const parsedDate = date.split('.').reverse()
      parsedDate[2]++
      dateRef.current.valueAsDate = new global.Date(parsedDate)
    }
  }, [date])

  return (
    <div className='w-fit mx-auto text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        { 'Дата *' }
      </label>

      <input
        data-testid='formDate'
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='date'
        name='date'
        ref={dateRef}
        onChange={inputText}
      />
    </div>
  )
}
