import Image from "next/image"

import editSrc from './edit.svg'
import shareSrc from './share.svg'

import imageSrc from './image.jpg'

const list = {
	date: "30.12.2023",
	title: "Приютили кошку",
	photos: {
		name: "cat",
		src: imageSrc
	},
	description: "Взяли у тёти Вали 6-месячную кошечку, назвали её Мёрси (с англ. Mercy - милосердие)",
	tags: [ "#кошка", "#начало" ],
}

export default function Item() {
	return (
		<div className='p-6 rounded-xl shadow-lg bg-sky-200 transition-all duration-150 hover:scale-105 hover:bg-sky-300'>
			<div className='flex items-center justify-between'>
				<button>
					<Image src={ editSrc } alt='edit' className='h-6 w-6 transition-all duration-150 hover:scale-110' />
				</button>

				<div className='font-bold'>
					{ list.date }
				</div>

				<button>
						<Image src={ shareSrc } alt='share' className='h-6 w-6 transition-all duration-150 hover:scale-110'/>
				</button>
			</div>

			<button className='block mx-auto mt-6 px-2 py-1 rounded-lg text-lg font-bold border-2 border-sky-900 transition-all duration-150 hover:bg-sky-300 hover:border-white hover:text-white'>
				{ list.title }
			</button>

			<div className='mt-6 flex items-center justify-center gap-3'>
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-105' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-105' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-105' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-28 max-w-28 rounded-xl cursor-pointer transition-all duration-150 hover:scale-105' />
			</div>	

			<div className='mt-6 rounded-lg'>
				{ list.description }
				<hr className='mt-6 border-sky-900' />
			</div>

			<div className='mt-4'>
				{ list.tags.join(' ') }
			</div>
		</div>
	)
}

