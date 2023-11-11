import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const pathname = new URL(request.url).pathname;
  const cookie = request.cookies
  const auth = cookie.get("auth")?.value
  if (pathname === '/' && auth !== 'true') {
    return NextResponse.redirect(new URL('/login', request.url))
  }
  if (auth === "true") {
    if (pathname === '/') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    return NextResponse.next()
  }
  return NextResponse.redirect(new URL('/login', request.url))
}

export const config = {
  matcher: ['/dashboard', '/'],
}
