import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { postScrape } from 'src/api/scrape'

import useScrapes from '@/stores/scrapes'

interface IAddScrapeProps {
    projectId: number
}

export default function AddScrape(props: IAddScrapeProps) {
    const { projectId } = props

    const t = useTranslations('ProjectScrapes')

    const [, { addScrape }] = useScrapes()

    const handleScrape = async (update: boolean) => {
        await postScrape(projectId, update)
            .then((data) => {
                addScrape(data)
            })
            .catch(() => {
                toast.error(t('error'))
            })
    }

    return (
        <div>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleScrape(false)}
            >
                {t('scrape')}
            </button>
            <button
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => handleScrape(true)}
            >
                {t('update_and_scrape')}
            </button>
        </div>
    )
}
