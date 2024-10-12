import { useState } from "react"
import clsx from "clsx"

import Link from "next/link"

const pages = [
	{
		'title': "События",
		'path': '/events'
	},
	{
		'title': "Цели",
		'path': '/targets'
	},
	{
		'title': "Знания",
		'path': '/knowledge'
	},
	{
		'title': "Мысли",
		'path': '/thoughts'
	},
	{
		'title': "Книги",
		'path': '/books'
	},
	{
		'title': "Кино",
		'path': '/cinema'
	},
]

export default function Navigation() {
	const [ currentPage, setCurrentPage ] = useState('/events')
	
	return (
    <div className='h-full flex text-sky-50 text-xl'>

      { pages.map((page) => {
				const styleLink = clsx({
					'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600': true,								
					'border-b-4 border-sky-50 bg-sky-700 hover:bg-sky-700': currentPage === page.path 
				})

        return (
          <Link
            className={ styleLink }
            href='#'
            key={ page.path }
            onClick={ handleClick }
            path={ page.path }
          >
            { page.title }
          </Link>
        )

      }) }
    </div>
  )

	function handleClick(e) {
		setCurrentPage(e.target.attributes.path.value)
	}
}