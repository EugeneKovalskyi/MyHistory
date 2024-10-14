import Image from 'next/image'

import profileSrc from './profile.svg'
import arrowSrc from './arrow.svg'

const styles = {
  Profile: 'transition-all duration-150 hover:scale-110',
}

export default function Profile() {
  return (
    <button className={styles.Profile}>
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
