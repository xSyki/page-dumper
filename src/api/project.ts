import { Project } from '@prisma/client'

import axiosApi from './axiosApi'

export const postProject = async (project: { name: string; url: string }) =>
    axiosApi.post<Project>(`/projects`, project).then((res) => res.data)

export const deleteProject = async (id: number) =>
    axiosApi.delete<number>(`/projects/${id}`).then((res) => res.data)
