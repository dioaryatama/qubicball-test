"use client"

import { useEffect, useState } from "react"
import type { UserPayload } from "@/lib/auth"
import { Bell, User } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Header({ title }: { title: string }) {
  const [user, setUser] = useState<UserPayload | null>(null)

  useEffect(() => {
    // In a real app, you would fetch the user data from an API
    // For this example, we'll use mock data
    setUser({
      id: 1,
      username: "testuser",
      name: "Test User",
      email: "test@example.com",
    })
  }, [])

  return (
    <header className="bg-white dark:bg-gray-900 shadow-sm border-b h-16 flex items-center px-6">
      <h1 className="text-xl font-semibold flex-1">{title}</h1>

      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="icon">
          <Bell className="h-5 w-5" />
        </Button>

        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </div>
          <span className="hidden md:inline-block">{user?.name}</span>
        </div>
      </div>
    </header>
  )
}
