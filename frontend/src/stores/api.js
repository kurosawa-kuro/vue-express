import { defineStore } from 'pinia'
import axios from 'axios'

const API_BASE_URL = 'http://localhost:3001'

export const useApiStore = defineStore('api', {
  state: () => ({
    users: [],
    microposts: [],
    loading: false,
    error: null
  }),

  actions: {
    async fetchUsers() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/users`)
        this.users = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching users:', error)
      } finally {
        this.loading = false
      }
    },

    async fetchMicroposts() {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/microposts`)
        this.microposts = response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching microposts:', error)
      } finally {
        this.loading = false
      }
    },

    async createMicropost(title, userId) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.post(`${API_BASE_URL}/microposts`, {
          title,
          userId
        })
        this.microposts.unshift(response.data)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error creating micropost:', error)
        throw error
      } finally {
        this.loading = false
      }
    },

    async fetchMicropostById(id) {
      this.loading = true
      this.error = null
      try {
        const response = await axios.get(`${API_BASE_URL}/microposts/${id}`)
        return response.data
      } catch (error) {
        this.error = error.message
        console.error('Error fetching micropost:', error)
        throw error
      } finally {
        this.loading = false
      }
    }
  }
})
