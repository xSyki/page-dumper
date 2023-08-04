import { Company } from '@prisma/client'

import axiosApi from './axiosApi'

export const putCompany = async (company: Partial<Company>) => {
    return axiosApi.put<Company>(`/company`, company).then((res) => res.data)
}
