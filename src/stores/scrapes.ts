import { createHook, createStore } from 'react-sweet-state'
import { Project, Scrape } from '@prisma/client'

export type ScrapeWithProject = Scrape & { project: Project }

interface IInitialState {
    scrapes: ScrapeWithProject[]
}

const initialState: IInitialState = {
    scrapes: [],
}

const Store = createStore({
    initialState,
    actions: {
        setScrapes:
            (scrapes: ScrapeWithProject[]) =>
            ({ setState }) => {
                setState({
                    scrapes,
                })
            },
        deleteScrape:
            (id: number) =>
            ({ getState, setState }) => {
                const { scrapes } = getState()
                const newScrapes = scrapes.filter((scrape) => scrape.id !== id)
                setState({
                    scrapes: newScrapes,
                })
            },
        addScrape:
            (scrape: ScrapeWithProject) =>
            ({ getState, setState }) => {
                const { scrapes } = getState()
                setState({
                    scrapes: [scrape, ...scrapes],
                })
            },
    },
    name: 'counter',
})

const useScrapes = createHook(Store)

export default useScrapes
