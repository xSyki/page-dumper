import prisma from '@/lib/prisma'

import getOffersWithDate from './analytics/getOffersWithDate'
import getUsersByRoleChart from './analytics/getUsersByRoleChart'

export default async function getAdminAnalytics() {
    const usersPromise = await prisma.user.findMany()
    const offersPromise = await prisma.offer.findMany({
        where: {
            createdAt: {
                gte: new Date(new Date().getTime() - 7 * 24 * 60 * 60 * 1000),
            },
        },
    })

    const [users, offers] = await Promise.all([usersPromise, offersPromise])

    return [getUsersByRoleChart(users), getOffersWithDate(offers)]
}
