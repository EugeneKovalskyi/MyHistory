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
		<div className='px-6 py-4 rounded-xl shadow-xl bg-sky-400/50'>
			<div className='flex items-center justify-between'>
				<button>
					<Image src={ editSrc } alt='edit' className='h-5 w-5' />
				</button>

				<div className='font-bold'>
					{ list.date }
				</div>

				<button>
						<Image src={ shareSrc } alt='share' className='h-5 w-5'/>
				</button>
			</div>

			<button className='w-full mt-4 px-2 py-1 rounded-lg text-lg text-center border-4 border-sky-800 bg-slate-100 hover:bg-sky-200/50 transition-all duration-150'>
				{ list.title }
			</button>

			<div className='mt-4 flex items-center justify-center gap-2'>
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-20 max-w-20 rounded-xl' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-20 max-w-20 rounded-xl' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-20 max-w-20 rounded-xl' />
				<Image src={ list.photos.src } alt={ list.photos.name } className='max-h-20 max-w-20 rounded-xl' />
			</div>	

			<div className='mt-4 px-4 py-2 rounded-lg text-sm bg-sky-500/25'>
				{ list.description }
			</div>

			<div className='mt-4'>
				{ list.tags.join(' ') }
			</div>
		</div>
	)
}

