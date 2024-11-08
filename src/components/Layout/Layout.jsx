import Header from './Header/Header'

import { Exo_2 } from 'next/font/google'

const exo_2 = Exo_2({
	subsets: ['latin', 'cyrillic']
})


export default function Layout({ children }) {
	return (
		<div className={exo_2.className}>
			<Header />
			{ children }
		</div>
	)
}
