import Link from "next/link"

export default function Item({ children }) {
	return (
		<Link href='#' className='w-32 flex items-center justify-center'>{ children }</Link>
	)
}