import React, { ReactNode } from 'react'
import { getServerSession } from 'next-auth'

import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

import Menu from './Menu/Menu'

interface ILayoutProps {
    children: ReactNode
}

export default async function Layout(props: ILayoutProps) {
    const { children } = props

    const session = await getServerSession(authOptions)

    return (
        <>
            {session ? (
                <>
                    <Menu user={session.user} />
                    <main
                        className="flex h-full flex-1 flex-col overflow-y-auto dark:bg-gray-900 p-5 sm:ml-64"
                        style={{ paddingBottom: '4.75rem' }}
                    >
                        {children}
                    </main>
                </>
            ) : (
                children
            )}
        </>
    )
}
