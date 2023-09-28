import { compare } from 'bcrypt'
import NextAuth, { type NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'

import prisma from '@/lib/prisma'

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            credentials: {
                email: { label: 'Email', type: 'email' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials) {
                const { email, password } = credentials ?? {}
                if (!email || !password) {
                    throw new Error('Missing username or password')
                }
                const user = await prisma.user.findUnique({
                    where: {
                        email,
                    },
                })

                if (!user || !(await compare(password, user.password))) {
                    throw new Error('Invalid username or password')
                }

                return user
            },
        }),
    ],
    session: {
        strategy: 'jwt',
    },
    callbacks: {
        async signIn() {
            return true
        },
        jwt({ token, user }) {
            if (user) {
                token.userId = user.id as number
                token.role = user.role
            }
            return token
        },
        session({ session, token }) {
            session.user.id = token.userId
            session.user.role = token.role

            return session
        },
    },
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
