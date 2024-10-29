import { useId, useRef, useEffect } from "react";

export default function Description({ inputText, currentItem }) {
  const id = useId();
  const descriptionRef = useRef();

  useEffect(() => {
    if (currentItem) descriptionRef.current.value = currentItem.description;
  }, [currentItem]);

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
        onChange={inputText} />
    </div>
  );
}
