import Link from 'next/link'
import Image from 'next/image'

import logoSrc from './logo.svg'

import { Pattaya } from 'next/font/google'

const pattaya = Pattaya({
	weight: '400',
	subsets: ['latin', 'cyrillic']
})



export default function Logo() {
	return (
		<Link href='/' className='flex items-center'>
			<Image src={ logoSrc } alt='logo' className='h-16 w-16' />
			<span className={ `${ pattaya.className } pt-1 pl-3 text-6xl` }>Моя История</span>
		</Link>
	)
}