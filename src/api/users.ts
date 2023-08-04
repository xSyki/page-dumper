import axiosApi from './axiosApi'

export const deleteUser = async (userId: number) => {
    return axiosApi.delete(`/admin/users/${userId}`).then((res) => res.data)
}
