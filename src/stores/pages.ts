import { createHook, createStore } from 'react-sweet-state'
import { Page } from '@prisma/client'

interface IInitialState {
    pages: Page[]
}

const initialState: IInitialState = {
    pages: [],
}

const Store = createStore({
    initialState,
    actions: {
        setPages:
            (pages: Page[]) =>
            ({ setState }) => {
                setState({
                    pages,
                })
            },
        deletePage:
            (id: number) =>
            ({ getState, setState }) => {
                const { pages } = getState()
                const newPages = pages.filter((project) => project.id !== id)
                setState({
                    pages: newPages,
                })
            },
        addPages:
            (newPages: Page[]) =>
            ({ getState, setState }) => {
                const { pages } = getState()
                setState({
                    pages: [...newPages, ...pages],
                })
            },
    },
    name: 'counter',
})

const usePages = createHook(Store)

export default usePages
