import { getRobots } from './getRobotsTxt'

export default async function findSitemaps(url: string) {
    const robotsTxt = await getRobots(url)

    return robotsTxt.getSitemaps()
}
