import { Project } from '@prisma/client'

import LatestProjects from '@/components/Molecules/LatestProjects/LatestProjects'
import LatestScrapes from '@/components/Molecules/LatestScrapes/LatestScripts'
import { ScrapeWithProject } from '@/stores/scrapes'

interface IHomeProps {
    latestProjects?: Project[]
    latestScrapes?: ScrapeWithProject[]
}

export default function Home(props: IHomeProps) {
    const { latestProjects, latestScrapes } = props

    return (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
            {latestProjects ? (
                <LatestProjects projects={latestProjects} />
            ) : null}
            {latestScrapes ? <LatestScrapes scrapes={latestScrapes} /> : null}
        </div>
    )
}
