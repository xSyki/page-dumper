'use client'

import {
    createContext,
    Dispatch,
    SetStateAction,
    useEffect,
    useState,
} from 'react'
import { toast } from 'react-hot-toast'
import { User } from '@prisma/client'
import { useTranslations } from 'next-intl'
import { deleteUser } from 'src/api/users'

import TrashIcon from '@/assets/icons/trash.svg'
import IconButton from '@/components/Atoms/IconButton/IconButton'
import Table from '@/components/Molecules/Table/Table'

import TableHeader from './TableHeader/TableHeader'

export const UsersContext = createContext<{
    users: User[]
    setUsers?: Dispatch<SetStateAction<User[]>>
    checkedUsers: number[]
    setCheckedUsers?: Dispatch<SetStateAction<number[]>>
}>({ users: [], checkedUsers: [] })

interface UsersProps {
    users: User[]
}

export default function Users(props: UsersProps) {
    const t = useTranslations('AdminPage')

    const [users, setUsers] = useState<User[]>(props.users)
    const [checkedUsers, setCheckedUsers] = useState<number[]>([])

    useEffect(() => {
        setUsers(props.users)
    }, [props.users])

    const handleDeleteUser = async (userId: number) => {
        deleteUser(userId).catch(() => {
            toast.error(t('error_occurred'))
        })

        setUsers?.((users) => users.filter(({ id }) => id !== userId))
    }

    return (
        <UsersContext.Provider
            value={{
                users,
                setUsers,
                checkedUsers,
                setCheckedUsers,
            }}
        >
            <div className="relative w-full overflow-x-auto shadow-md">
                <TableHeader />
                <Table
                    name="users"
                    header={[
                        {
                            label: t('name'),
                            orderBy: { name: 'name' },
                        },
                        {
                            label: t('email'),
                            orderBy: { name: 'email' },
                        },
                        {
                            label: t('role'),
                            orderBy: { name: 'role' },
                        },
                        {
                            label: t('actions'),
                        },
                    ]}
                    rows={users.map((user) => ({
                        cells: [
                            {
                                content: user.name,
                            },
                            {
                                content: user.email,
                            },
                            {
                                content: user.role,
                            },
                            {
                                content: (
                                    <div className="flex gap-4">
                                        <IconButton
                                            onClick={() =>
                                                handleDeleteUser(user.id)
                                            }
                                            Icon={TrashIcon}
                                        />
                                    </div>
                                ),
                            },
                        ],
                    }))}
                />
            </div>
        </UsersContext.Provider>
    )
}
