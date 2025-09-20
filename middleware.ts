import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

// Authentication middleware for protected routes
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Protected routes that require authentication
  const protectedRoutes = ["/seller", "/buyer", "/admin"]
  const isProtectedRoute = protectedRoutes.some((route) => pathname.startsWith(route))

  if (isProtectedRoute) {
    // TODO: Implement JWT token verification
    // const token = request.cookies.get('auth-token')?.value
    // if (!token || !verifyToken(token)) {
    //   return NextResponse.redirect(new URL('/login', request.url))
    // }

    // For now, allow all requests (development mode)
    console.log(`[v0] Protected route accessed: ${pathname}`)
  }

  // API routes middleware
  if (pathname.startsWith("/api/")) {
    // Add CORS headers
    const response = NextResponse.next()
    response.headers.set("Access-Control-Allow-Origin", "*")
    response.headers.set("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS")
    response.headers.set("Access-Control-Allow-Headers", "Content-Type, Authorization")

    return response
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/seller/:path*", "/buyer/:path*", "/admin/:path*", "/api/:path*"],
}
