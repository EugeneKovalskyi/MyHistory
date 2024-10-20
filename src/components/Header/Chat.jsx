import Image from "next/image"

import chatSrc from './chat.svg'

export default function Chat() {
  return (
    <button className='transition-all duration-150 hover:scale-110'>
      <Image
        className='w-9 h-9'
        src={chatSrc}
        alt='chat'
      />
    </button>
  )
}