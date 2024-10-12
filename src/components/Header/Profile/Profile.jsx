import Image from "next/image"

import profileSrc from './profile.svg'
import arrowSrc from './arrow.svg'

export default function Profile() {
	const style = 'transition-all duration-150 hover:scale-110'
	
	return (
		<button className={ style }>
			<Image className='w-9 h-9 mt-3' src={profileSrc} alt='profile' />
			<Image className='mx-auto w-3 h-3' src={arrowSrc} alt='arrow' />
		</button>
	)
}