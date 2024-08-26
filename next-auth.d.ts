import 'next-auth'
import 'next-auth/jwt'

declare module 'next-auth' {
  interface Session {
    user: {
      accessToken?: string
    }
  }

  interface User {
    role?: string
    token?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    role?: string
    accessToken?: string
  }
}
