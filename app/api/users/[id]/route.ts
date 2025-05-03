import { NextResponse } from "next/server"
import { getUserById, updateUser } from "@/lib/api"

interface RouteParams {
  params: {
    id: string
  }
}

export async function GET(request: Request, { params }: RouteParams) {
  try {
    const userId = Number.parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    const user = await getUserById(userId)
    return NextResponse.json(user)
  } catch (error) {
    console.error(`Error fetching user with ID ${params.id}:`, error)
    return NextResponse.json({ message: "Failed to fetch user" }, { status: 500 })
  }
}

export async function PATCH(request: Request, { params }: RouteParams) {
  try {
    const userId = Number.parseInt(params.id)

    if (isNaN(userId)) {
      return NextResponse.json({ message: "Invalid user ID" }, { status: 400 })
    }

    const userData = await request.json()
    const updatedUser = await updateUser(userId, userData)

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error(`Error updating user with ID ${params.id}:`, error)
    return NextResponse.json({ message: "Failed to update user" }, { status: 500 })
  }
}
