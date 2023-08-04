import * as React from 'react'
import { Text } from '@react-email/components'

export default function Footer() {
    return (
        <>
            <Text className="text-gray-50">Thanks,</Text>
            <Text className="text-gray-50">{process.env.SITE_NAME}</Text>
        </>
    )
}
