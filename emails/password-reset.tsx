import * as React from 'react'
import { Text } from '@react-email/components'

import Layout from './Components/Layout'

interface IPasswordResetEmailProps {
    title: string
    name: string
    description: string
}

export default function PasswordReset(props: IPasswordResetEmailProps) {
    const { title, name, description } = props

    return (
        <Layout title={title} name={name}>
            <Text className="mt-[20px] text-gray-50">{description}</Text>
        </Layout>
    )
}
