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
	const styles = {
		'Navigation': 'h-full flex text-sky-50 text-xl',
		'Link': 'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600',
		'current': 'border-b-4 border-sky-50 bg-sky-700 hover:bg-sky-700'
	}

	const [ currentPage, setCurrentPage ] = useState('/events')
	
	return (
    <div className={ styles.Navigation }>
      { pages.map((page) => {
				const isCurrent = (currentPage === page.path)

        return (
          <Link
            className={ clsx(
							styles.Link, 
							isCurrent && styles.current
						) }
            href='#'
            key={ page.path }
            onClick={ () => setCurrentPage(page.path) }
          >
            { page.title }
          </Link>
        )
      })}
    </div>
  )
}