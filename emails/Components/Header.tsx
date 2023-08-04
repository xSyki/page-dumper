import * as React from 'react'
import { Heading, Hr, Text } from '@react-email/components'

interface IHeaderProps {
    name?: string
    title?: string
}

export default function Header(props: IHeaderProps) {
    const { name, title } = props

    return (
        <>
            {title ? (
                <>
                    <Heading className="text-center text-gray-50">
                        {title}
                    </Heading>
                    <Hr />
                </>
            ) : null}
            <Text className="mt-[20px] text-gray-50">
                Hi{name ? ` ${name},` : ','}
            </Text>
        </>
    )
}
