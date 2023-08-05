import { createHook, createStore } from 'react-sweet-state'
import { Project } from '@prisma/client'

interface IInitialState {
    projects: Project[]
}

const initialState: IInitialState = {
    projects: [],
}

const Store = createStore({
    initialState,
    actions: {
        setProjects:
            (projects: Project[]) =>
            ({ setState }) => {
                setState({
                    projects,
                })
            },
        deleteProject:
            (id: number) =>
            ({ getState, setState }) => {
                const { projects } = getState()
                const newProjects = projects.filter(
                    (project) => project.id !== id
                )
                setState({
                    projects: newProjects,
                })
            },
        addProject:
            (project: Project) =>
            ({ getState, setState }) => {
                const { projects } = getState()
                setState({
                    projects: [project, ...projects],
                })
            },
    },
    name: 'counter',
})

const useProjects = createHook(Store)

export default useProjects
