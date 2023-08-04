'use client'

import { useState } from 'react'
import { User } from '@prisma/client'

import Aside from '../Aside/Aside'
import Nav from '../Nav/Nav'

interface IMenuProps {
    user: User
}

export default function Menu(props: IMenuProps) {
    const { user } = props

    const [isAsideOpen, setIsAsideOpen] = useState(false)

    return (
        <>
            <Nav
                user={user}
                toggleAside={() => setIsAsideOpen((isOpen) => !isOpen)}
            />
            <Aside user={user} isAsideOpen={isAsideOpen} />
        </>
    )
}
