import { parse } from 'json2csv'

import DownloadIcon from '@/assets/icons/download.svg'

interface IDownloadCSVProps {
    content?: unknown
}

function DownloadCSV(props: IDownloadCSVProps) {
    const { content } = props

    if (!content) return null

    return (
        <a
            href={URL.createObjectURL(
                new Blob([parse(content)], {
                    type: 'text/csv;charset=utf-8',
                })
            )}
            download="file.csv"
        >
            <DownloadIcon className="h-6 w-6 flex-shrink-0 fill-gray-300 text-gray-500 transition duration-75 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        </a>
    )
}

export default DownloadCSV
