import { Metadata } from 'next'

export function seo(metadata: Metadata) {
    return {
        ...metadata,
        title: `${metadata.title} - ${process.env.SITE_NAME}`,
    }
}
