import Link from "next/link"

export default function Item({ children }) {
	return (
		<Link href='#' className='w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600'>{ children }</Link>
	)
}