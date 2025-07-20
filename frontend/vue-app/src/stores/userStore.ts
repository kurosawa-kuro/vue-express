import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface User {
  id: number
  name: string
  createdAt: string
  updatedAt: string
  microposts: Micropost[]
}

export interface Micropost {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
}

export const useUserStore = defineStore('user', () => {
  const users = ref<User[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const API_BASE = 'http://localhost:3000/api'

  const fetchUsers = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/users`)
      if (!response.ok) throw new Error('Failed to fetch users')
      users.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createUser = async (name: string) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name }),
      })
      if (!response.ok) throw new Error('Failed to create user')
      const newUser = await response.json()
      users.value.push(newUser)
      return newUser
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getUserById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/users/${id}`)
      if (!response.ok) throw new Error('Failed to fetch user')
      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    users,
    loading,
    error,
    fetchUsers,
    createUser,
    getUserById,
  }
})
