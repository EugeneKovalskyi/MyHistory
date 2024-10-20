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

export default function Navigation() {
  const [currentLink, setCurrentLink] = useState('/events')

  return (
    <div className='h-full flex text-sky-50 text-xl'>
      {navigationLinks.map((link) => {
        const isCurrent = currentLink === link.path

        return (
          <Link
            className={clsx(
              'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600',
              isCurrent && 'border-b-4 border-sky-50 bg-sky-700 hover:bg-sky-700'
            )}
            href='#'
            key={link.path}
            onClick={() => setCurrentLink(link.path)}
          >
            {link.title}
          </Link>
        )
      })}
    </div>
  )
}
