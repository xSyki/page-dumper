import axiosApi from './axiosApi'

export const postProject = async (project: { name: string; url: string }) =>
    axiosApi.put(`/projects`, project).then((res) => res.data)
