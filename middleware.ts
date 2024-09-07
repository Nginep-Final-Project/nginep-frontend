import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'
import { toast } from './components/ui/use-toast'

export async function middleware(request: NextRequest) {
  const session = await auth()

  const { pathname } = request.nextUrl

  if (
    ['/dashboard', '/profile', '/transaction'].some((route) =>
      pathname.startsWith(route)
    )
  ) {
    if (!session || !session.user) {
      console.log('Uh-oh! You forgot to log in! 👀')
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/dashboard') && session.user.role !== 'tenant') {
      console.log(
        'Access denied! Sorry, Guest, this area is for Tenants only. 🚪🔒'
      )
      return NextResponse.redirect(new URL('/', request.url))
    }

    if (pathname.startsWith('/transaction') && session.user.role !== 'guest') {
      console.log(
        'Access denied! Sorry, Tenant, this area is for Guest only. 🚪🔒'
      )
      return NextResponse.redirect(new URL('/', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/transaction/:path*'],
}
