import Image from "next/image"

import chatSrc from './chat.svg'

export default function Chat() {
	return (
		<button>
			<Image src={chatSrc} alt='chat' className='w-9 h-9'/>
		</button>
	)
}