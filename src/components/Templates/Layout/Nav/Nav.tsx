'use client'

import { useRef, useState } from 'react'
import { User } from '@prisma/client'
import { signOut } from 'next-auth/react'
import { useTranslations } from 'next-intl'
import Link from 'next-intl/link'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { c } from 'src/utils'

import PersonPlaceholderIcon from '@/assets/icons/person.svg'

interface INavProps {
    user: User
    toggleAside: () => void
}

export default function Nav(props: INavProps) {
    const { user, toggleAside } = props
    const { name, email } = user

    const t = useTranslations('Index')

    const [isProfileOpen, setIsProfileOpen] = useState(false)

    const profileRef = useRef(null)

    useOnClickOutside(profileRef, () => setIsProfileOpen(false))

    return (
        <nav className="sticky z-50 w-full border-b border-gray-200 bg-white dark:border-gray-700 dark:bg-gray-800">
            <div className="px-3 py-3 lg:px-5 lg:pl-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center justify-start">
                        <button
                            data-drawer-target="logo-sidebar"
                            data-drawer-toggle="logo-sidebar"
                            aria-controls="logo-sidebar"
                            type="button"
                            className="inline-flex items-center rounded-lg p-2 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600 sm:hidden"
                            onClick={toggleAside}
                        >
                            <span className="sr-only">{t('open_sidebar')}</span>
                            <svg
                                className="h-6 w-6"
                                aria-hidden="true"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    clipRule="evenodd"
                                    fillRule="evenodd"
                                    d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                                ></path>
                            </svg>
                        </button>
                        <Link href="/" className="ml-2 flex md:mr-24">
                            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white sm:text-2xl">
                                Page Dumper
                            </span>
                        </Link>
                    </div>
                    <div className="flex items-center">
                        <div className="ml-3 flex items-center">
                            <div>
                                <button
                                    type="button"
                                    className="flex rounded-full bg-gray-800 text-sm focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
                                    aria-expanded="false"
                                    data-dropdown-toggle="dropdown-user"
                                    onClick={() => setIsProfileOpen(true)}
                                >
                                    <span className="sr-only">
                                        {t('open_user_menu')}
                                    </span>
                                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-300">
                                        <PersonPlaceholderIcon className="h-6 w-6 flex-shrink-0 fill-gray-800 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                                    </div>
                                </button>
                            </div>
                            <div
                                ref={profileRef}
                                className={c(
                                    'absolute right-2 top-12 z-50 my-4 list-none divide-y divide-gray-100 rounded bg-white text-base shadow dark:divide-gray-600 dark:bg-gray-700',
                                    !isProfileOpen && 'hidden'
                                )}
                                id="dropdown-user"
                            >
                                <div className="px-4 py-3" role="none">
                                    <p
                                        className="text-sm text-gray-900 dark:text-white"
                                        role="none"
                                    >
                                        {name}
                                    </p>
                                    <p
                                        className="truncate text-sm font-medium text-gray-900 dark:text-gray-300"
                                        role="none"
                                    >
                                        {email}
                                    </p>
                                </div>
                                <ul className="py-1" role="none">
                                    <li>
                                        <Link
                                            href="/profile"
                                            className="block w-full px-4 py-2 text-center text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem"
                                        >
                                            {t('profile')}
                                        </Link>
                                    </li>
                                    <li>
                                        <button
                                            onClick={() => signOut()}
                                            className="block w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
                                            role="menuitem"
                                        >
                                            {t('sign_out')}
                                        </button>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    )
}
