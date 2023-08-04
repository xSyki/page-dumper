import { ReactNode } from 'react'
import {
    Body,
    Container,
    Html,
    Preview,
    Tailwind,
} from '@react-email/components'

import Footer from './Footer'
import Header from './Header'

interface ILayout {
    children: ReactNode
    name?: string
    title?: string
}

export default function Layout(props: ILayout) {
    const { children, name, title } = props

    return (
        <Html>
            {title ? <Preview>{title}</Preview> : null}
            <Tailwind>
                <Body className="mx-auto my-auto bg-gray-900 font-sans">
                    <Container className="mx-auto my-[40px] w-[465px] rounded-lg border-gray-700 bg-gray-800 p-[20px] shadow">
                        <Header name={name} title={title} />
                        {children}
                        <Footer />
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}
