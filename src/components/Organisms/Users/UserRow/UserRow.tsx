'use client'

import { useContext } from 'react'
import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { deleteUser } from 'src/api/users'

import { UsersContext } from '../Users'

interface IUserRowProps {
    user: User
}

export default function UserRow(props: IUserRowProps) {
    const { user } = props

    const t = useTranslations('Index')

    const { setUsers } = useContext(UsersContext)

    const handleDeleteUser = async () => {
        deleteUser(user.id).catch(() => {
            toast.error(t('error_occurred'))
        })

        setUsers?.((users) => users.filter(({ id }) => id !== user.id))
    }

    return (
        <tr
            className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
            key={user.id}
        >
            <td className="px-6 py-4">{user.id}</td>
            <td className="px-6 py-4">{user.name}</td>
            <td className="px-6 py-4">{user.email}</td>
            <td className="px-6 py-4">{user.role}</td>
            <td className="px-6 py-4">
                <div className="flex gap-4">
                    <button
                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                        onClick={handleDeleteUser}
                    >
                        {t('delete')}
                    </button>
                </div>
            </td>
        </tr>
    )
}
