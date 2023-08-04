import { ReactNode } from 'react'

interface ILayoutProps {
    children: ReactNode
}

export default function RootLayout({ children }: ILayoutProps) {
    return children
}
