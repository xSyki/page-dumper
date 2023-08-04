import { ReactNode } from 'react'

interface ITitleProps {
    children: ReactNode
    as: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
}

export default function Title(props: ITitleProps) {
    const { children, as } = props

    return (
        <div className="mb-4">
            {as === 'h1' && (
                <h1 className="text-3xl font-bold text-gray-50">{children}</h1>
            )}
            {as === 'h2' && (
                <h2 className="text-2xl font-bold text-gray-50">{children}</h2>
            )}
            {as === 'h3' && (
                <h3 className="text-xl font-bold text-gray-50">{children}</h3>
            )}
            {as === 'h4' && (
                <h4 className="text-lg font-bold text-gray-50">{children}</h4>
            )}
            {as === 'h5' && (
                <h5 className="text-base font-bold text-gray-50">{children}</h5>
            )}
            {as === 'h6' && (
                <h6 className="text-sm font-bold text-gray-50">{children}</h6>
            )}
        </div>
    )
}
