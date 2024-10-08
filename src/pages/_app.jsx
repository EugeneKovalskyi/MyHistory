import '../styles/global.css'

import { Exo_2 } from 'next/font/google'

const exo_2 = Exo_2({
	subsets: ['latin', 'cyrillic']
})

export default function App({ Component, pageProps }) {
	return (
		<div className={exo_2.className}>
			<Component { ...pageProps } />
		</div>
	)
} 