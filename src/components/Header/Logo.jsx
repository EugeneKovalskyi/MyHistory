import Link from 'next/link'
import Image from 'next/image'

import logoSrc from './logo.svg'

import { Pattaya } from 'next/font/google'

const pattaya = Pattaya({
  weight: '400',
  subsets: ['latin', 'cyrillic'],
})

const styles = {
  Logo: 'h-full flex items-center transition-all duration-150 hover:scale-105',
  LogoText: `${pattaya.className} pl-2 text-4xl`,
}

export default function Logo() {
  return (
    <Link
      className={styles.Logo}
      href='/'
    >
      <Image
        className='h-9 w-9'
        src={logoSrc}
        alt='logo'
      />
      <span className={ styles.LogoText }>Моя История</span>
    </Link>
  )
}