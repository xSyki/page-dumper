import axiosApi from './axiosApi'

export const deleteUser = async (userId: number) =>
    axiosApi.delete(`/admin/users/${userId}`).then((res) => res.data)
