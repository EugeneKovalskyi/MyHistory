import { useEffect, useId, useRef } from "react"

import { TITLE_MAX_LENGTH } from '@/constants'

export default function Title({ inputText, isTitleValid, validateTitle, title }) {
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
        { 
          isTitleValid ? 'Название *' 
          : 
          <span className='text-rose-700/70'>
            ⚠ Введите название
          </span>
        }
      </label>

      <input
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        maxLength={TITLE_MAX_LENGTH}
        ref={titleRef}
        onChange={inputText}
        onBlur={validateTitle}
      />
    </div>
  )
}