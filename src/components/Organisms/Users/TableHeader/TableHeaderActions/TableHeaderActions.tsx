'use client'

import { useContext, useRef, useState } from 'react'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { c } from 'src/utils'

import { UsersContext, UserWithCompany } from '../../Users'

import AddUser from './AddUser/AddUser'

export default function TableHeaderActions() {
    const { setUsers } = useContext(UsersContext)

    const [isActionsOpen, setIsActionsOpen] = useState(false)

    const actionRef = useRef(null)

    useOnClickOutside(actionRef, () => setIsActionsOpen(false))

    return (
        <div className="relative" ref={actionRef}>
            <button
                id="dropdownActionButton"
                data-dropdown-toggle="dropdownAction"
                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                type="button"
                onClick={() => setIsActionsOpen(!isActionsOpen)}
            >
                <span className="sr-only">Action button</span>
                Action
                <svg
                    className="ml-2 h-3 w-3"
                    aria-hidden="true"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M19 9l-7 7-7-7"
                    ></path>
                </svg>
            </button>
            <div
                id="dropdownAction"
                className={c(
                    !isActionsOpen && 'hidden',
                    'absolute top-12 z-10 w-44 divide-y divide-gray-100 rounded-lg bg-white shadow dark:divide-gray-600 dark:bg-gray-700'
                )}
            >
                <AddUser
                    addUser={(user: UserWithCompany) =>
                        setUsers?.((users) => [user, ...users])
                    }
                />
            </div>
        </div>
    )
}
