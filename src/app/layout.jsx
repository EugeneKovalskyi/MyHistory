import '../styles/global.css'
import { Exo_2 } from 'next/font/google'
import Header from "../components/Header/Header"

const exo_2 = Exo_2({
	subsets: ['latin', 'cyrillic']
})

export default function RootLayout({ children }) {
	return (
		<html>
			<body className={exo_2.className}>
				<Header />
				{ children }
			</body>
		</html>
	)
}