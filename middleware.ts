import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { auth } from './auth'

export async function middleware(request: NextRequest) {
  const session = await auth()

  const { pathname } = request.nextUrl

  if (
    ['/dashboard', '/profile', '/transaction', '/user'].some((route) =>
      pathname.startsWith(route)
    ) ||
    pathname.match(/^\/[a-zA-Z0-9]+\/booking-summary$/)
  ) {
    if (!session || !session.user) {
      return NextResponse.redirect(
        new URL('/?error=unauthenticated', request.url)
      )
    }

    if (pathname.startsWith('/dashboard') && session.user.role !== 'tenant') {
      return NextResponse.redirect(
        new URL('/?error=unauthorized_tenant', request.url)
      )
    }

    if (pathname.startsWith('/transaction') && session.user.role !== 'guest') {
      return NextResponse.redirect(
        new URL('/?error=unauthorized_guest', request.url)
      )
    }

    if (
      pathname.match(/^\/[a-zA-Z0-9]+\/booking-summary$/) &&
      session.user.role !== 'guest'
    ) {
      return NextResponse.redirect(
        new URL('/?error=unauthorized_guest', request.url)
      )
    }

    if (pathname.startsWith('/user') && session.user.role !== 'guest') {
      return NextResponse.redirect(
        new URL('/?error=unauthorized_guest', request.url)
      )
    }
  
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/profile/:path*',
    '/transaction/:path*',
    '/:path*/booking-summary',
    '/user/:path*',
  ],
}
