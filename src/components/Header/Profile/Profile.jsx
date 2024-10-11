import Image from "next/image"

import profileSrc from './profile.svg'
import arrowSrc from './arrow.svg'

export default function Profile() {
	return (
		<button className='transition-all duration-150 hover:scale-110'>
			<Image src={profileSrc} alt='profile' className='w-9 h-9 mt-3'/>
			<Image src={arrowSrc} alt='arrow' className='mx-auto w-3 h-3'/>
		</button>
	)
}