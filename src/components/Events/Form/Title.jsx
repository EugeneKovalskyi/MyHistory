import { useEffect, useId, useRef } from "react"
import { TITLE_MAX_LENGTH } from '@/constants'

export default function Title({ inputText, title }) {
  const id = useId()
  const titleRef = useRef()

  useEffect(() => {
      if (title) titleRef.current.value = title
    }, [title])

  return (
    <div className='mt-10 text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        { 'Название *' }
      </label>

      <input
        data-testid='formTitle'
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        placeholder='Название длинной до 50 символов'
        maxLength={TITLE_MAX_LENGTH}
        ref={titleRef}
        onChange={inputText}
      />
    </div>
  )
}