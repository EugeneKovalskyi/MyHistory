import { useState } from 'react'
import clsx from 'clsx'

import Link from 'next/link'

const navigationLinks = [
  {
    "title": "События",
    "path": "/events"
  },
  {
    "title": "Цели",
    "path": "/targets"
  },
  {
    "title": "Знания",
    "path": "/knowledge"
  },
  {
    "title": "Мысли",
    "path": "/thoughts"
  },
  {
    "title": "Книги",
    "path": "/books"
  },
  {
    "title": "Кино",
    "path": "/cinema"
  }
]

const styles = {
  Navigation: 'h-full flex text-sky-50 text-xl',
  Link: 'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600',
  current: 'border-b-4 border-sky-50 bg-sky-700 hover:bg-sky-700',
}

export default function Navigation() {
  const [currentPage, setCurrentPage] = useState('/events')

  return (
    <div className={styles.Navigation}>
      {
        navigationLinks.map((link) => {
          const isCurrent = currentPage === link.path

          return (
            <Link
              className={clsx(styles.Link, isCurrent && styles.current)}
              href='#'
              key={link.path}
              onClick={() => setCurrentPage(link.path)}
            >
              {link.title}
            </Link>
          )
        })
      }
    </div>
  )
}
