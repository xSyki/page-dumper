import { getServerSession } from 'next-auth/next'

import { authOptions } from '@/pages/api/auth/[...nextauth]/route'

export default async function AuthStatus() {
    const session = await getServerSession(authOptions)

    return (
        <div className="absolute top-5 flex w-full items-center justify-center">
            {session && (
                <p className="text-sm text-stone-200">
                    Signed in as {session.user?.email}
                </p>
            )}
        </div>
    )
}
