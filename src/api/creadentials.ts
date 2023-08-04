import axiosApi from './axiosApi'

export const postPasswordRecover = async (email: string) =>
    axiosApi.post('/password-recover', email)

export const putPasswordRecover = async (data: {
    token: string
    password: string
}) => axiosApi.put('/password-recover', data)
