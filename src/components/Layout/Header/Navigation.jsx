import Link from 'next/link'
import clsx from 'clsx'
import { usePathname } from 'next/navigation'

const navigationLinks = [
  {
    id: 1,
    title: 'События',
    path: '/events',
  },
  {
    id: 2,
    title: 'Цели',
    path: '/targets',
  },
  {
    id: 3,
    title: 'Знания',
    path: '/knowledge',
  },
  {
    id: 4,
    title: 'Мысли',
    path: '/thoughts',
  },
  {
    id: 5,
    title: 'Книги',
    path: '/books',
  },
  {
    id: 6,
    title: 'Кино',
    path: '/cinema',
  },
]

export default function Navigation() {
  const pathname = usePathname()

  return (
    <div className='h-full flex text-sky-50 text-xl'>
      {
        navigationLinks.map(({ id, title, path }) => {
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
