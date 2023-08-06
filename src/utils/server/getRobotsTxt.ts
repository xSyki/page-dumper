import axios from 'axios'
import robotsParser from 'robots-parser'

interface IRobotsTxtModel {
    'User-agent': string[]
    Disallow: string[]
    Sitemap: string[]
    Host: string[]
}

export const robotsTxtModel: IRobotsTxtModel = {
    'User-agent': [],
    Disallow: [],
    Sitemap: [],
    Host: [],
}

export async function getRobots(url: string) {
    const domain = new URL('/', url).origin

    const text = await axios.get(`${domain}/robots.txt`).then((res) => res.data)

    return robotsParser(`${domain}/robots.txt`, text)
}
