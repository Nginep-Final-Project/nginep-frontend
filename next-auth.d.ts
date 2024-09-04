import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
      role?: string
      name?: string
      image?: string
    }
  }

  interface User {
    role?: string
    token?: string
    name?: string
    image?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    accessToken?: string
    name?: string
  }
}
