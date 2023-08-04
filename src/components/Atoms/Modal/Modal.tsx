'use client'

import { useRef } from 'react'
import useOnClickOutside from 'src/hooks/useOnClickOutside'
import { c } from 'src/utils'

interface IModalProps {
    isOpen: boolean
    closeModal: () => void
    children: React.ReactNode
    className?: string
    popupClassName?: string
}

export default function Modal(props: IModalProps) {
    const { isOpen, closeModal, children, className, popupClassName } = props

    const childrenRef = useRef<HTMLDivElement>(null)

    useOnClickOutside(childrenRef, closeModal)

    if (!isOpen) return null

    return (
        <div
            className={c(
                'fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black bg-opacity-50',
                className
            )}
        >
            <div
                className={c('rounded-xl bg-gray-900 p-8', popupClassName)}
                ref={childrenRef}
            >
                {children}
            </div>
        </div>
    )
}
