import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import Chat from './Chat/Chat'
import Profile from './Profile/Profile'

export default function Header() {
  const style = [
    'w-full shadow-xl text-sky-50 bg-sky-500',
    'h-16 max-w-screen-xl mx-auto px-8 flex items-center justify-between gap-9',
  ]

  return (
    <div className={ style[0] }>
    	<div className={ style[1] }>
        <Logo />
        <Navigation />

        <div className='flex gap-5'>
          <Chat />
          <Profile />
        </div>
      </div>
    </div>
  )
}
