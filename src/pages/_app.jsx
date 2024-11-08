import '../styles/global.css'

import Layout from '../components/Layout/Layout'


export default function App({ Component, pageProps }) {
	return (
		<Layout>
			<Component { ...pageProps } />
		</Layout>
	)
} 