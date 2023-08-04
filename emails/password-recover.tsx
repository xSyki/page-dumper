import * as React from 'react'
import { Link, Text } from '@react-email/components'

import Layout from './Components/Layout'

interface IPasswordRecoverEmailProps {
    title: string
    name: string
    url: string
    cta: string
    description: string
}

export default function PasswordRecoverEmail(
    props: IPasswordRecoverEmailProps
) {
    const { title, name, url, cta, description } = props

    return (
        <Layout title={title} name={name}>
            <Link
                href={url}
                className="focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800 w-full rounded-lg bg-blue-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-4"
            >
                {cta}
            </Link>
            <Text className="mt-[20px] text-gray-50">{description}</Text>
        </Layout>
    )
}
