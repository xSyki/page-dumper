/* eslint-disable @typescript-eslint/no-unused-vars */
import NextAuth from 'next-auth'

declare module 'next-auth' {
    interface User {
        id: number
        name: string
        email: string
        role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
        companyId: number
    }

    interface AdapterUser {
        id: number
        name: string
        email: string
        role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
        companyId: number
    }
    interface Session {
        user: {
            id: number
            name: string
            email: string
            role: 'ADMIN' | 'MANAGER' | 'EMPLOYEE'
            companyId: number
        } & DefaultSession['user']
    }
}

declare module 'next-auth/jwt' {
    interface JWT {
        userId: number
        companyId: number
    }
}
