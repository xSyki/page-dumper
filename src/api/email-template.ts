import { EmailTemplate } from '@prisma/client'

import axiosApi from './axiosApi'

export const putEmailTemplate = async (
    emailTemplate: Partial<EmailTemplate>
) => {
    return axiosApi
        .put(`/email-template`, emailTemplate)
        .then((res) => res.data)
}
