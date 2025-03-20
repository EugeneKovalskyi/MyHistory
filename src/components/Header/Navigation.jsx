import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

import { NAVIGATION_LINKS } from '@/constants'

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div 
      data-testid='navigation'
      className='h-full flex text-sky-50 text-xl'
    >
      {
        NAVIGATION_LINKS.map(({ id, title, path }) => {
          return (
            <Link
              className={clsx(
                'w-28 flex items-center justify-center transition-all duration-150 hover:bg-sky-600',
                pathname === path && 'border-b-4 border-sky-50 bg-sky-700 hover:bg-sky-700'
              )}
              key={id}
              href={path}
              replace
            >
              {title}
            </Link>
          )
        })
      }
    </div>
  )
}
