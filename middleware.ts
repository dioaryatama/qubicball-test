import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import * as jose from "jose"

// JWT secret key (in a real app, this would be in an environment variable)
const JWT_SECRET = new TextEncoder().encode("your-secret-key")

// Paths that don't require authentication
const publicPaths = ["/login", "/api/auth/login"]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Check if the path is public
  if (publicPaths.includes(pathname)) {
    return NextResponse.next()
  }

  // Check for API routes that don't need authentication
  if (pathname.startsWith("/api/auth/")) {
    return NextResponse.next()
  }

  // Get the JWT token from the cookies
  const token = request.cookies.get("auth_token")?.value

  // If there's no token, redirect to login
  if (!token) {
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }

  try {
    // Verify the token using jose instead of jsonwebtoken
    await jose.jwtVerify(token, JWT_SECRET)
    return NextResponse.next()
  } catch (error) {
    // If token verification fails, redirect to login
    const url = new URL("/login", request.url)
    return NextResponse.redirect(url)
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!_next/static|_next/image|favicon.ico|public).*)",
  ],
}
