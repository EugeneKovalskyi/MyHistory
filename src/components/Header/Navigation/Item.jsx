import Link from "next/link"

export default function Item({ children }) {
	const style = 'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600'

	return (
		<Link className={ style }href='#'>{ children }</Link>
	)
}