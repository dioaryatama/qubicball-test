"use server"

import { cache } from "react"

export interface User {
  id: number
  name: string
  username: string
  email: string
  address: {
    street: string
    suite: string
    city: string
    zipcode: string
    geo: {
      lat: string
      lng: string
    }
  }
  phone: string
  website: string
  company: {
    name: string
    catchPhrase: string
    bs: string
  }
}

export interface Post {
  userId: number
  id: number
  title: string
  body: string
}

// Cache the fetch requests to improve performance
export const getUsers = cache(async (): Promise<User[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch users")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching users:", error)
    throw error
  }
})

export const getUserById = cache(async (id: number): Promise<User> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch user with ID ${id}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching user with ID ${id}:`, error)
    throw error
  }
})

export const getPosts = cache(async (): Promise<Post[]> => {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/posts", {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error("Failed to fetch posts")
    }

    return response.json()
  } catch (error) {
    console.error("Error fetching posts:", error)
    throw error
  }
})

export const getPostsByUserId = cache(async (userId: number): Promise<Post[]> => {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`, {
      next: { revalidate: 3600 }, // Revalidate every hour
    })

    if (!response.ok) {
      throw new Error(`Failed to fetch posts for user with ID ${userId}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error fetching posts for user with ID ${userId}:`, error)
    throw error
  }
})

export async function updateUser(id: number, userData: Partial<User>): Promise<User> {
  try {
    const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`Failed to update user with ID ${id}`)
    }

    return response.json()
  } catch (error) {
    console.error(`Error updating user with ID ${id}:`, error)
    throw error
  }
}
