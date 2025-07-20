import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface Micropost {
  id: number
  title: string
  userId: number
  createdAt: string
  updatedAt: string
  user: {
    id: number
    name: string
    createdAt: string
    updatedAt: string
  }
}

export const useMicropostStore = defineStore('micropost', () => {
  const microposts = ref<Micropost[]>([])
  const loading = ref(false)
  const error = ref<string | null>(null)

  const API_BASE = 'http://localhost:3000/api'

  const fetchMicroposts = async () => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/microposts`)
      if (!response.ok) throw new Error('Failed to fetch microposts')
      microposts.value = await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
    } finally {
      loading.value = false
    }
  }

  const createMicropost = async (title: string, userId: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/microposts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, userId }),
      })
      if (!response.ok) throw new Error('Failed to create micropost')
      const newMicropost = await response.json()
      microposts.value.push(newMicropost)
      return newMicropost
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  const getMicropostById = async (id: number) => {
    loading.value = true
    error.value = null
    try {
      const response = await fetch(`${API_BASE}/microposts/${id}`)
      if (!response.ok) throw new Error('Failed to fetch micropost')
      return await response.json()
    } catch (err) {
      error.value = err instanceof Error ? err.message : 'Unknown error'
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    microposts,
    loading,
    error,
    fetchMicroposts,
    createMicropost,
    getMicropostById,
  }
})
