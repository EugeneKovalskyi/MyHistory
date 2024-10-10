import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import Chat from './Chat/Chat'
import Profile from './Profile/Profile'

export default function Header() {
  return (
    <div className='shadow-xl text-sky-50 bg-sky-500'>
    	<div className='h-16 max-w-screen-xl mx-auto px-8 flex items-center justify-center gap-10'>
        <Logo />
        <Navigation />
        <Chat />
        <Profile />
      </div>
    </div>
  )
}
