import { useId, useRef, useEffect } from "react";

export default function Tags({ inputText, tags }) {
  const id = useId();
  const tagsRef = useRef();

  useEffect(() => {
    if (tags) tagsRef.current.value = tags
  }, [tags]);

  return (
    <div className='mt-6'>
      <label
        className='font-bold text-xl text-sky-50'
        htmlFor={id}
      >
        Теги
      </label>

      <input
        className='block mt-4 px-4 py-2 rounded-lg text-lg bg-slate-100 transition-all duration-150 hover:bg-white focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white'
        id={id}
        type='text'
        name='tags'
        maxLength={50}
        placeholder='Ассоциативное слово'
        ref={tagsRef}
        onChange={inputText} />
    </div>
  );
}
