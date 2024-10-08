import Logo from './Logo/Logo'

export default function Header() {
	return (
		<div className='flex h-28 px-10	items-center shadow-lg text-sky-50 bg-sky-500'>
			<Logo />
		</div>
	)
}