import Image from 'next/image'

import profileSrc from '@/public/profile.svg'

export default function Profile() {
  return (
    <button className='transition-all duration-150 hover:scale-110'>
      <Image
        className='w-9 h-9'
        src={profileSrc}
        alt='profile'
      />
    </button>
  )
}
