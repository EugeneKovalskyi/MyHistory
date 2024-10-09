import Logo from './Logo/Logo'
import Navigation from './Navigation/Navigation'
import Chat from './Chat/Chat'
import Profile from './Profile/Profile'

export default function Header() {
	return (
		<div className='h-16 flex gap-10 items-center justify-center shadow-lg text-sky-50 bg-sky-500'>
			<Logo />
			<Navigation />
			<Chat />
			<Profile />	
		</div>
	)
}