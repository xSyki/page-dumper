import { Project } from '@prisma/client'

import axiosApi from './axiosApi'

export const putProjectScript = async (project: {
    id: number
    script: string
}) => axiosApi.put<Project>(`/projects/script`, project).then((res) => res.data)

export const postTestScript = async (projectId: number) =>
    axiosApi
        .post<string>(`/projects/script/test`, {
            projectId,
        })
        .then((res) => res.data)
