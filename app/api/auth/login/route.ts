import { NextResponse } from "next/server"
import * as jose from "jose"
import { cookies } from "next/headers"

// Mock credentials for authentication
const MOCK_USER = {
  username: "testuser",
  password: "testpass",
  name: "Test User",
  email: "test@example.com",
  id: 1,
}

// JWT secret key (in a real app, this would be in an environment variable)
const JWT_SECRET = new TextEncoder().encode("your-secret-key")

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { username, password } = body

    // Validate credentials
    if (username !== MOCK_USER.username || password !== MOCK_USER.password) {
      return NextResponse.json({ message: "Invalid username or password" }, { status: 401 })
    }

    // Create JWT token using jose instead of jsonwebtoken
    const token = await new jose.SignJWT({
      id: MOCK_USER.id,
      username: MOCK_USER.username,
      name: MOCK_USER.name,
      email: MOCK_USER.email,
    })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("1h")
      .sign(JWT_SECRET)

    // Set JWT token in HTTP-only cookie
    cookies().set({
      name: "auth_token",
      value: token,
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      maxAge: 60 * 60, // 1 hour
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Login error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
