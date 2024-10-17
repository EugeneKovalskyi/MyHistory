import Image from 'next/image'

import addSrc from './add.svg'

export default function Form({ isOpened, closeForm, addEvent }) {
  const styles = {
    FormContainer: 'z-10 fixed top-0 left-0 min-h-screen w-full bg-black/50',
    Form: 'max-w-3xl mx-auto mt-24 px-10 py-6 rounded-xl border-2 bg-sky-500',
    DateLabel: 'block w-fit mx-auto text-center text-xl font-bold text-sky-50',
    DateInput:
      'block mt-4 px-4 py-2 rounded-lg text-lg font-normal resize-none text-black bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white hover:bg-white',
    TitleLabel: 'block mt-10 text-center text-xl font-bold text-sky-50',
    TitleInput:
      'block w-full mt-4 px-4 py-2 rounded-lg text-center text-lg font-normal resize-none text-black bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white hover:bg-white',
    DescriptionLabel: 'block mt-10 text-xl font-bold text-sky-50',
    DesctiptionInput:
      'block w-full mt-4 px-4 py-2 rounded-lg text-lg font-normal resize-none text-black bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white hover:bg-white',
    PhotosLabel: 'block w-fit mt-10 text-xl font-bold text-sky-50',
    PhotosImage:
      'w-20 h-20 mt-4 rounded-xl border-2 shadow-md shadow-black/25 cursor-pointer transition-all duration-150 hover:scale-110',
    TagsLabel: 'block w-fit mt-10 text-xl font-bold text-sky-50',
    TagsInput:
      'block mt-4 px-4 py-2 rounded-lg text-lg font-normal resize-none text-black bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-700 focus:bg-white hover:bg-white',
    CancelButton:
      'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-rose-400/50 transition-all duration-150 hover:bg-rose-400',
    SaveButton:
      'px-4 py-2 rounded-lg font-bold text-xl text-sky-50 border-2 bg-emerald-400/50 transition-all duration-150 hover:bg-emerald-400',
  }

  return (
    <div className={styles.FormContainer} hidden={!isOpened}>
      <form className={styles.Form} name='eventForm'>
        <label className={styles.DateLabel}>
          Дата
          <input
            className={styles.DateInput}
            type='date'
            name='date'
            required
          ></input>
        </label>
        <label className={styles.TitleLabel}>
          Название
          <input
            className={styles.TitleInput}
            type='text'
            name='title'
            maxLength={70}
            required
          />
        </label>
        <label className={styles.DescriptionLabel}>
          Подробное описание
          <textarea
            className={styles.DesctiptionInput}
            type='text'
            name='description'
            rows={10}
          />
        </label>
        <label className={styles.PhotosLabel}>
          Фотографии
          <input
            className='w-0 h-0'
            type='file'
            name='photos'
            accept='image/*'
            multiple
          />
          <Image
            className={styles.PhotosImage}
            src={addSrc}
            alt='Upload Photo'
          />
        </label>
        <label className={styles.TagsLabel}>
          Теги
          <input
            className={styles.TagsInput}
            type='text'
            name='tags'
            maxLength={30}
            placeholder='Ассоциативное слово'
          />
        </label>
        <div className='mt-16 flex justify-between'>
          <button className={styles.CancelButton} onClick={closeForm}>Отменить</button>
          <button className={styles.SaveButton} onClick={ () => { addEvent(); closeForm() } }>Добавить</button>
        </div>
      </form>
    </div>
  )
}
