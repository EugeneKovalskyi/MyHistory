import { useEffect, useId, useRef, useState } from "react"

export default function Title({ inputText, isFormHidden, validateForm, currentItem }) {
  
  function validateTitle(e) {
    if (e.target.value.trim() === '') {
      validateForm('Title', false)
      setIsTitleValid(false)
    }
    else {
      validateForm('Title',true)
      setIsTitleValid(true)
    }
  }
  
  const id = useId()
  const titleRef = useRef()
  const [isTitleValid, setIsTitleValid] = useState(true)

  useEffect(() => {
    if (currentItem) {
      titleRef.current.value = currentItem.title
      validateForm('Title', true)
    }

    if (isFormHidden) setIsTitleValid(true)

    }, [currentItem, isFormHidden])

  return (
    <div className='mt-10 text-center'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        { 
          isTitleValid ? 'Название *' 
          : 
          <span className='text-rose-700'>
            ⚠ Введите название ⚠
          </span>
        }
      </label>

      <input
        className='block w-full mt-4 px-4 py-2 rounded-lg text-lg text-center bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='title'
        maxLength={50}
        ref={titleRef}
        onChange={inputText}
        onBlur={validateTitle}
      />
    </div>
  )
}