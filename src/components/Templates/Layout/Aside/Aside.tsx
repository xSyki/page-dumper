'use client'

import { User } from '@prisma/client'
import { usePathname } from 'next/navigation'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import { c } from 'src/utils'

import AlbumsIcon from '@/assets/icons/albums.svg'
import AppsIcon from '@/assets/icons/apps.svg'
import AdminIcon from '@/assets/icons/laptop.svg'
import ProfileIcon from '@/assets/icons/person.svg'

interface IAsideProps {
    user: User
    isAsideOpen: boolean
}

export default function Aside(props: IAsideProps) {
    const {
        user: { role },
        isAsideOpen,
    } = props

    const t = useTranslations('Index')

    const pathname = usePathname()

    const menuItems = [
        {
            label: t('dashboard'),
            href: '/',
            icon: (
                <AppsIcon className="h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            ),
            roles: ['USER', 'ADMIN'],
        },
        {
            label: t('project'),
            href: '/projects',
            icon: (
                <AlbumsIcon className="h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            ),
            roles: ['USER', 'ADMIN'],
        },
        {
            label: t('admin'),
            href: '/admin',
            icon: (
                <AdminIcon className="h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            ),
            roles: ['ADMIN'],
        },
        {
            label: t('profile'),
            href: '/profile',
            icon: (
                <ProfileIcon className="h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
            ),
            roles: ['USER', 'ADMIN'],
        },
    ]

    const isHrefActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.includes(href)

    return (
        <aside
            id="logo-sidebar"
            className={c(
                'fixed left-0 top-0 z-40 h-screen w-64 -translate-x-full border-r border-gray-200 bg-white pt-20 transition-transform dark:border-gray-700 dark:bg-gray-800 sm:translate-x-0',
                isAsideOpen && 'translate-x-0'
            )}
            aria-label="Sidebar"
        >
            <div className="h-full overflow-y-auto bg-white px-3 pb-4 dark:bg-gray-800">
                <ul className="space-y-2 font-medium">
                    {menuItems
                        .filter((menuItem) => menuItem.roles.includes(role))
                        .map((menuItem) => (
                            <li key={menuItem.label}>
                                <Link
                                    href={menuItem.href}
                                    className={c(
                                        'flex items-center rounded-lg p-2 text-gray-900 hover:bg-gray-100 dark:text-white dark:hover:bg-gray-700',
                                        isHrefActive(menuItem.href) &&
                                            'bg-gray-100 dark:bg-gray-700'
                                    )}
                                >
                                    {menuItem.icon}
                                    <span className="ml-3 flex-1 whitespace-nowrap">
                                        {menuItem.label}
                                    </span>
                                </Link>
                            </li>
                        ))}
                </ul>
            </div>
        </aside>
    )
}
