<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="userName" class="block text-sm font-medium text-gray-700 mb-1">
        User Name
      </label>
      <input
        id="userName"
        v-model="userName"
        type="text"
        required
        placeholder="Enter user name"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        :disabled="userStore.loading"
      />
    </div>
    
    <div v-if="userStore.error" class="bg-red-50 border border-red-200 rounded-md p-3">
      <p class="text-red-800 text-sm">{{ userStore.error }}</p>
    </div>
    
    <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-3">
      <p class="text-green-800 text-sm">{{ successMessage }}</p>
    </div>
    
    <button
      type="submit"
      :disabled="userStore.loading || !userName.trim()"
      class="w-full flex justify-center items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <div v-if="userStore.loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      {{ userStore.loading ? 'Creating...' : 'Create User' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()
const userName = ref('')
const successMessage = ref('')

const handleSubmit = async () => {
  if (!userName.value.trim()) return
  
  try {
    await userStore.createUser(userName.value.trim())
    successMessage.value = `User "${userName.value}" created successfully!`
    userName.value = ''
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    // Error is handled by the store
  }
}
</script>
