"use server";

import { cookies } from "next/headers";
import * as jose from "jose";

// JWT secret key (in a real app, this would be in an environment variable)
const JWT_SECRET = new TextEncoder().encode("your-secret-key");

export interface UserPayload {
  id: number;
  username: string;
  name: string;
  email: string;
}

export async function getJwtFromCookies(): Promise<string | null> {
  const token = cookies().get("auth_token")?.value;
  return token || null;
}

export async function getCurrentUser(): Promise<UserPayload | null> {
  const token = await getJwtFromCookies();

  if (!token) {
    return null;
  }

  try {
    const { payload } = await jose.jwtVerify(token, JWT_SECRET);
    return payload as unknown as UserPayload;
  } catch (error) {
    console.error("Error verifying token:", error);
    return null;
  }
}
