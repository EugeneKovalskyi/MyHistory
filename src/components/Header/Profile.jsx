import Image from 'next/image'

import profileSrc from '@/public/profile.svg'
import arrowSrc from '@/public/arrow.svg'

export default function Profile() {
  return (
    <button className='transition-all duration-150 hover:scale-110'>
      <Image
        className='w-9 h-9 mt-3'
        src={profileSrc}
        alt='profile'
      />
      <Image
        className='mx-auto w-3 h-3'
        src={arrowSrc}
        alt='arrow'
      />
    </button>
  )
}
