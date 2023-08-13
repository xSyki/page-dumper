import { FC, MouseEvent } from 'react'

interface IIconButtonProps {
    Icon: FC<{ className: string }>
    onClick: (e: MouseEvent<HTMLElement>) => void
}

export default function IconButton(props: IIconButtonProps) {
    const { Icon, onClick } = props

    return (
        <button
            className="flex items-center rounded-lg p-1 text-gray-900  dark:text-white "
            onClick={(e) => onClick(e)}
        >
            <Icon className="hover:color-gray-300 h-6 w-6 flex-shrink-0 fill-gray-400 text-gray-500 transition duration-75 hover:fill-gray-300 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
        </button>
    )
}
