import { NextResponse } from 'next/server'
import { auth } from '@/auth'
import { NextRequest } from 'next/server'

export default auth(async (req) => {
  const { nextUrl, headers, method } = req
  const origin = headers.get('origin')
  const response = NextResponse.next()

  // security headers
  response.headers.set(
    'Strict-Transport-Security',
    'max-age=31536000; includeSubDomains; preload'
  )
  response.headers.set('X-Content-Type-Options', 'nosniff')
  response.headers.set('X-Frame-Options', 'DENY')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set(
    'Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval'; style-src 'self' 'unsafe-inline' fonts.googleapis.com; font-src 'self' fonts.gstatic.com; img-src 'self' data: blob:; connect-src 'self' https://*.vercel-postgres.com"
  )

  // HTTPS in production
  if (process.env.NODE_ENV === 'production' && !req.url.startsWith('https://')) {
    return NextResponse.redirect(`https://${req.url.split('//')[1]}`)
  }

  // Allow auth routes before any auth checks
  if (nextUrl.pathname.startsWith("/api/auth")) {
    return response;
  }

  // Session-based auth check
  const isLoggedIn = !!req.auth
  if (!isLoggedIn) {
    return new NextResponse(
      JSON.stringify({ error: "Authentication required" }),
      { 
        status: 401, 
        headers: { 
          'Content-Type': 'application/json',
          ...response.headers
        } 
      }
    )
  }

  // Protect API routes
  if (nextUrl.pathname.startsWith("/api/")) {
    // Enhanced CORS protection with secure defaults
    const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || []
    if (origin) {
      if (!allowedOrigins.includes(origin)) {
        return new NextResponse(
          JSON.stringify({ error: "Origin not allowed" }),
          { 
            status: 403,
            headers: {
              'Content-Type': 'application/json',
              ...response.headers
            }
          }
        )
      }
      // Add CORS headers for allowed origins
      response.headers.set('Access-Control-Allow-Origin', origin)
      response.headers.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE')
      response.headers.set('Access-Control-Allow-Headers', 'Content-Type, Authorization')
      response.headers.set('Access-Control-Max-Age', '86400') // 24 hours
    }

    // Method validation
    const allowedMethods = ['GET', 'POST', 'PUT', 'DELETE']
    if (!allowedMethods.includes(method)) {
      return new NextResponse(
        JSON.stringify({ error: "Method not allowed" }),
        { 
          status: 405,
          headers: {
            'Content-Type': 'application/json',
            ...response.headers
          }
        }
      )
    }

    // Request size limit
    const contentLength = parseInt(req.headers.get('content-length') || '0')
    if (contentLength > 1024 * 1024) { // 1MB
      return new NextResponse(
        JSON.stringify({ error: "Request entity too large" }),
        { 
          status: 413,
          headers: {
            'Content-Type': 'application/json',
            ...response.headers
          }
        }
      )
    }
  }

  return response
})

export const config = {
  matcher: [
    '/api/:path*',
    '/chat/:path*',
    '/workflows/:path*',
    '/settings/:path*',
    '/docs/:path*'
  ]
}