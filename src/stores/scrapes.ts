import { createHook, createStore } from 'react-sweet-state'
import { Scrape } from '@prisma/client'

interface IInitialState {
    scrapes: Scrape[]
}

const initialState: IInitialState = {
    scrapes: [],
}

const Store = createStore({
    initialState,
    actions: {
        setScrapes:
            (scrapes: Scrape[]) =>
            ({ setState }) => {
                setState({
                    scrapes,
                })
            },
        deleteScrape:
            (id: number) =>
            ({ getState, setState }) => {
                const { scrapes } = getState()
                const newScrapes = scrapes.filter(
                    (project) => project.id !== id
                )
                setState({
                    scrapes: newScrapes,
                })
            },
        addScrape:
            (project: Scrape) =>
            ({ getState, setState }) => {
                const { scrapes } = getState()
                setState({
                    scrapes: [project, ...scrapes],
                })
            },
    },
    name: 'counter',
})

const useScrapes = createHook(Store)

export default useScrapes
