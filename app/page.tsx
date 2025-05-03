import { redirect } from "next/navigation"
import { getJwtFromCookies } from "@/lib/auth"

export default function Home() {
  // Check if user is authenticated, if yes, redirect to dashboard
  // If not, redirect to login page
  const token = getJwtFromCookies()

  if (token) {
    redirect("/dashboard")
  } else {
    redirect("/login")
  }

  return null
}
