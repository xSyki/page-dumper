import { User } from '@prisma/client'
import axios from 'axios'

import axiosApi from './axiosApi'

export const putUser = async (user: Partial<User>) =>
    axiosApi.put(`/user`, user).then((res) => res.data)

export const postRegister = async (user: {
    name: string
    email: string
    password: string
}) => axios.post<User>('/api/auth/register', user).then((res) => res.data)

export const putPassword = async (password: string) =>
    axiosApi.put(`/user/password`, password).then((res) => res.data)
