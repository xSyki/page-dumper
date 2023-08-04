import { EmailProvider } from '@prisma/client'

import axiosApi from './axiosApi'

export const putEmailProvider = async (
    emailProvider: Partial<EmailProvider>
) => {
    return axiosApi
        .put(`/email-provider`, emailProvider)
        .then((res) => res.data)
}
