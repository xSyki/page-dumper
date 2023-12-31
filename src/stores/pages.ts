import { createHook, createStore } from 'react-sweet-state'
import { deletePage } from 'src/api/pages'

export interface IPagePreview {
    id: number
    url: string
    status?: number | null
    content?: boolean | null
    createdAt?: Date | null
}

interface IInitialState {
    pages: IPagePreview[]
}

const initialState: IInitialState = {
    pages: [],
}

const Store = createStore({
    initialState,
    actions: {
        setPages:
            (pages: IPagePreview[]) =>
            ({ setState }) => {
                setState({
                    pages,
                })
            },
        deletePage:
            (id: number) =>
            async ({ getState, setState }) => {
                const { pages } = getState()

                await deletePage(id)

                const newPages = pages.filter((project) => project.id !== id)

                setState({
                    pages: newPages,
                })
            },
        addPages:
            (newPages: IPagePreview[]) =>
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
