import Image from 'next/image'

import searchSrc from './search.svg'

export default function Search() {
	const styles = {
		'Search': 'w-2/5 px-6 py-4 flex gap-5 rounded-xl shadow-lg bg-sky-600',
		'Input': 'px-3 grow rounded-lg bg-slate-100 transition-all duration-150 focus:outline-none focus:ring focus:ring-inset focus:ring-sky-400 focus:bg-white hover:bg-white',
		'Button': 'transition-all duration-150 hover:scale-110'
	}

	return (
		<div className={ styles.Search }>
			<input className={ styles.Input } type='text' placeholder='Искать...' />
			<button className={ styles.Button }>
				<Image className='h-9 w-9' src={ searchSrc } alt='search' />
			</button>
		</div>
	)
}