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
			<Image src={ logoSrc } alt='logo' className='h-9 w-9' />
			<span className={ `${pattaya.className} pl-2 text-4xl` }>Моя История</span>
		</Link>
	)
}