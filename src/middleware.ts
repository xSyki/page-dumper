/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest } from 'next/server'
import { withAuth } from 'next-auth/middleware'
import createIntlMiddleware from 'next-intl/middleware'

const locales = ['en', 'pl']
const publicPages = [
    '/login',
    '/register',
    '/forgot-password',
    '/password-recover',
]

const adminPages = ['/admin', '/admin/users', '/admin/companies']

const managerPages = ['/company', '/company/users']

const intlMiddleware = createIntlMiddleware({
    locales,
    defaultLocale: 'en',
})

const authMiddleware = withAuth((req) => intlMiddleware(req), {
    callbacks: {
        authorized: ({ token, req }) => {
            if (token === null) return false

            if (
                adminPages.includes(req.nextUrl.pathname) &&
                token?.role !== 'ADMIN'
            )
                return false

            if (
                managerPages.includes(req.nextUrl.pathname) &&
                token?.role !== 'MANAGER' &&
                token?.role !== 'ADMIN'
            )
                return false

            return true
        },
    },
    pages: {
        signIn: '/login',
    },
})

export default function middleware(req: NextRequest) {
    const publicPathnameRegex = RegExp(
        `^(/(${locales.join('|')}))?(${publicPages.join('|')})?/?$`,
        'i'
    )
    const isPublicPage = publicPathnameRegex.test(req.nextUrl.pathname)

    if (
        isPublicPage &&
        req.nextUrl.pathname !== '/' &&
        req.nextUrl.pathname !== '/pl'
    ) {
        return intlMiddleware(req)
    } else {
        return (authMiddleware as any)(req)
    }
}

export const config = {
    // Skip all paths that should not be internationalized
    matcher: ['/((?!api|_next|.*\\..*).*)'],
}
