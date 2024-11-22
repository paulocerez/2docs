import { NextResponse } from 'next/server'
import { auth } from '@/auth'

export default auth((req) => {
  const { nextUrl } = req
  const isLoggedIn = !!req.auth

  // Protect API routes
  if (nextUrl.pathname.startsWith("/api/")) {
    if (nextUrl.pathname.startsWith("/api/auth")) {
      return NextResponse.next();
    }

    // if (!isLoggedIn) {
    //   return new NextResponse(
    //     JSON.stringify({ error: "Authentication required" }),
    //     { status: 401, headers: { 'Content-Type': 'application/json' } }
    //   )
    // }
  }

  // Allow access to all other routes
  return NextResponse.next()
})

// route matching
export const config = {
  matcher: ["/api/:path*", "/chat", "/workflows", "/settings", "/docs"],
};