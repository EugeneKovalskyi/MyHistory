import Logo from './Logo'
import Navigation from './Navigation'
import Chat from './Chat'
import Profile from './Profile'

const styles = {
  HeaderContainer: 'w-full shadow-xl text-sky-50 bg-sky-500',
  Header:
    'h-16 max-w-screen-xl mx-auto px-8 flex items-center justify-between gap-9',
}

export default function Header() {
  return (
    <div className={styles.HeaderContainer}>
      <div className={styles.Header}>
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
