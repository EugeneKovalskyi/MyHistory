import Image from "next/image"

import chatSrc from './chat.svg'

const styles = {
  Chat: 'transition-all duration-150 hover:scale-110',
}

export default function Chat() {

  return (
    <button className={styles.Chat}>
      <Image
        className='w-9 h-9'
        src={chatSrc}
        alt='chat'
      />
    </button>
  )
}