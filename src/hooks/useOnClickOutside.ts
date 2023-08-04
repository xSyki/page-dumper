import React, { useEffect } from 'react'

function useOnClickOutside(
    ref: React.RefObject<HTMLElement>,
    callback: () => void
) {
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                callback()
            }
        }

        document.addEventListener('click', handleClickOutside, true)
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                callback()
            }
        })

        return () => {
            document.removeEventListener('click', handleClickOutside, true)
            document.removeEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    callback()
                }
            })
        }
    }, [ref, callback])
}

export default useOnClickOutside
