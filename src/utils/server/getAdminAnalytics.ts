import prisma from '@/lib/prisma'

import getUsersByRoleChart from './analytics/getUsersByRoleChart'

export default async function getAdminAnalytics() {
    const usersPromise = await prisma.user.findMany()

    const [users] = await Promise.all([usersPromise])

    return [getUsersByRoleChart(users)]
}
