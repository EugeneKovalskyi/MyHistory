import Image from "next/image"

import profileSrc from './profile.svg'
import arrowSrc from './arrow.svg'

export default function Profile() {
	return (
		<button>
			<Image src={profileSrc} alt='profile' className='mt-3 w-9 h-9'/>
			<Image src={arrowSrc} alt='arrow' className='mx-auto w-3 h-3'/>
		</button>
	)
}