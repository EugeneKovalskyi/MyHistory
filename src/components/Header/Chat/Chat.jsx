import Image from "next/image"

import chatSrc from './chat.svg'

export default function Chat() {
	const style = 'transition-all duration-150 hover:scale-110'

	return (
		<button className={ style }>
			<Image className='w-9 h-9' src={chatSrc} alt='chat' />
		</button>
	)
}