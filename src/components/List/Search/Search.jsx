import Image from 'next/image'

import searchSrc from './search.svg'

export default function Search() {
	return (
		<div className='w-2/5 px-6 py-4 flex gap-5 rounded-xl shadow-xl bg-sky-600'>
			<input type='text' placeholder='Искать...' className='px-3 grow rounded-lg focus:outline-none focus:ring focus:ring-inset focus:ring-sky-400' />
			<button>
				<Image src={searchSrc} alt='search' className='h-9 w-9' />
			</button>
		</div>
	)
}