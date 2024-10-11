import Image from 'next/image'

import sortSrc from './sort.svg'

export default function Sort() {
	return (
		<div className='w-2/5 px-6 py-4 flex gap-5 rounded-lg shadow-xl bg-sky-600'>
				<button className='transition-all duration-150 hover:scale-110'>
					<Image src={ sortSrc } alt='sort' className='h-9 w-9' />
				</button>
				<select name='criterion' className='px-3 grow rounded-lg text-center cursor-pointer bg-slate-100 transition-all duration-150 focus:bg-white hover:bg-white'>
					<option value="name">По названию</option>
					<option value="date">По дате</option>
				</select>
		</div>
	)
}