import Image from 'next/image'

import sortSrc from './sort.svg'

export default function Sort() {
	const styles = {
		'Sort': 'w-2/5 px-6 py-4 flex gap-5 rounded-lg shadow-xl bg-sky-600',
		'Button': 'transition-all duration-150 hover:scale-110',
		'Select': 'px-3 grow rounded-lg text-center cursor-pointer bg-slate-100 transition-all duration-150 focus:bg-white hover:bg-white'
	}

	return (
		<div className={ styles.Sort }>
				<button className={ styles.Button }>
					<Image className='h-9 w-9' src={ sortSrc } alt='sort' />
				</button>
				<select className={ styles.Select } name='criterion'>
					<option value="name">По названию</option>
					<option value="date">По дате</option>
				</select>
		</div>
	)
}
