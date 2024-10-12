import Image from 'next/image'

import searchSrc from './search.svg'

export default function Search() {
	const style = 'w-2/5 px-6 py-4 flex gap-5 rounded-xl shadow-lg bg-sky-600'
	const styleInput = 'px-3 grow rounded-lg bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-400 focus:bg-white hover:bg-white'
	const styleButton = 'transition-all duration-150 hover:scale-110'

	return (
		<div className={ style }>
			<input className={ styleInput } type='text' placeholder='Искать...' />
			<button className={ styleButton }>
				<Image className='h-9 w-9' src={ searchSrc } alt='search' />
			</button>
		</div>
	)
}