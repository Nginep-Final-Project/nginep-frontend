import NextAuth from 'next-auth'
import Google from 'next-auth/providers/google'
import Credentials from 'next-auth/providers/credentials'
import { cookies } from 'next/headers'

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )
          if (!response.ok) {
            throw new Error('Authentication failed')
          }
          const data = await response.json()

          const cookieStore = cookies()
          cookieStore.set('sid', data.data.token, {
            maxAge: 24 * 60 * 60,
          })

          return {
            id: data.data.user.id.toString(),
            email: data.data.user.email,
            role: data.data.user.role,
            profilePicture: data.data.user.profilePicture,
            name: data.data.user.fullName,
            phoneNumber: data.data.user.phoneNumber,
            token: data.data.token,
          }
        } catch (error) {
          console.error('Authentication error:', error)
          return null
        }
      },
    }),
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
      authorization: {
        params: {
          prompt: 'consent',
          scope: 'openid email profile',
          access_type: 'offline',
          response_type: 'code',
        },
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    async jwt({ token, user, account }) {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
        token.name = user.name!
        token.picture = user.image
      }
      if (account) {
        if (account.provider === 'google') {
          try {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_HOSTNAME_API}/${process.env.NEXT_PUBLIC_PREFIX_API}/auth/google-login`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  idToken: account.id_token,
                }),
              }
            )

            if (!response.ok) {
              throw new Error('Google authentication failed')
            }
            const data = await response.json()
            token.accessToken = data.data.token
            token.role = data.data.user.role
            token.id = data.data.user.id.toString()

            const cookieStore = cookies()
            cookieStore.set('sid', data.data.token, {
              maxAge: 24 * 60 * 60,
            })
          } catch (error) {
            console.error('Google authentication error:', error)
          }
        } else if (account.provider === 'credentials') {
          token.accessToken = user.token
        }
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token.role) {
        session.user.role = token.role
        session.user.accessToken = token.accessToken
        session.user.name = token.name!
        session.user.image = token.picture!
      }
      return session
    },
  },
  pages: {
    signIn: '/',
  },
  session: { strategy: 'jwt', maxAge: 24 * 60 * 60 },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `session-jwt`,
      options: {
        httpOnly: true,
        sameSite: 'lax',
      },
    },
  },
})
