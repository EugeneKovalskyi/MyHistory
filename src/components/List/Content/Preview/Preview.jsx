import Image from 'next/image'

import editSrc from './edit.svg'
import shareSrc from './share.svg'

import imageSrc from './image.jpg'

const list = {
  day: '30.12.2023',
  title: 'Приютили кошку',
  photos: {
    alt: 'cat',
    src: imageSrc,
  },
  description:
    'Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)',
  tags: ['#кошка', '#начало'],
}

export default function Preview() {
  const style = 'px-10 py-6 rounded-xl shadow-lg bg-sky-200 transition-all duration-150 hover:scale-105 hover:bg-sky-300'

  return (
    <div className={ style }>
			<Tools />
      <Day day={ list.day } />
			<Title title={ list.title } />
      <Photos photos={ list.photos }/>
			<Description description={ list.description }/>
			<Tags tags={ list.tags }/>
    </div>
  )
}

function Tools() {
  const style = 'flex items-center justify-between'

  return (
    <div className={ style }>
      <button>
        <Image className='h-6 w-6' src={ editSrc } alt='edit' />
      </button>
      <button>
        <Image className='h-6 w-6' src={ shareSrc } alt='share' />
      </button>
    </div>
  )
}

function Day({ day }) {
	return <div className='text-center font-bold'>{ day }</div>
}

function Title({ title }) {
	const style = 'block mx-auto mt-4 px-2 py-1 rounded-lg text-lg font-bold border-2 border-sky-900 transition-all duration-150 hover:bg-sky-300 hover:border-white hover:text-white'
	
	return <button className={ style }>{ title }</button>
}

function Photos({ photos }) {
  const styles = {
    'Photos': 'mt-6 flex items-center justify-center gap-4', 
    'Image': 'max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-110'
  }

  return (
    <div className={ styles.Photos }>
      <Image className={ styles.Image } src={ photos.src } alt={ photos.alt }/>
      <Image className={ styles.Image } src={ photos.src } alt={ photos.alt }/>
      <Image className={ styles.Image } src={ photos.src } alt={ photos.alt }/>
      <Image className={ styles.Image } src={ photos.src } alt={ photos.alt }/>
    </div>
  )
}

function Description({ description }) {
	return (
		<div className='mt-4 rounded-lg'>
			{ description }
			<hr className='mt-6 border-sky-900' />
		</div>
	)
}

function Tags({ tags }) {
	return <div className='mt-4'>{ tags.join(' ') }</div>
}