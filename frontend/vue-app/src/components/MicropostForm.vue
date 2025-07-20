<template>
  <form @submit.prevent="handleSubmit" class="space-y-4">
    <div>
      <label for="micropostTitle" class="block text-sm font-medium text-gray-700 mb-1">
        Micropost Title
      </label>
      <input
        id="micropostTitle"
        v-model="micropostTitle"
        type="text"
        required
        placeholder="Enter micropost title"
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        :disabled="micropostStore.loading"
      />
    </div>
    
    <div>
      <label for="userId" class="block text-sm font-medium text-gray-700 mb-1">
        Select User
      </label>
      <select
        id="userId"
        v-model="selectedUserId"
        required
        class="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
        :disabled="micropostStore.loading || userStore.loading"
      >
        <option value="">Choose a user...</option>
        <option 
          v-for="user in userStore.users" 
          :key="user.id" 
          :value="user.id"
        >
          {{ user.name }} (ID: {{ user.id }})
        </option>
      </select>
      <p v-if="userStore.users.length === 0" class="mt-1 text-sm text-gray-500">
        No users available. Create a user first.
      </p>
    </div>
    
    <div v-if="micropostStore.error" class="bg-red-50 border border-red-200 rounded-md p-3">
      <p class="text-red-800 text-sm">{{ micropostStore.error }}</p>
    </div>
    
    <div v-if="successMessage" class="bg-green-50 border border-green-200 rounded-md p-3">
      <p class="text-green-800 text-sm">{{ successMessage }}</p>
    </div>
    
    <button
      type="submit"
      :disabled="micropostStore.loading || !micropostTitle.trim() || !selectedUserId"
      class="w-full flex justify-center items-center px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      <div v-if="micropostStore.loading" class="inline-block animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
      {{ micropostStore.loading ? 'Creating...' : 'Create Micropost' }}
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useMicropostStore } from '../stores/micropostStore'
import { useUserStore } from '../stores/userStore'

const micropostStore = useMicropostStore()
const userStore = useUserStore()
const micropostTitle = ref('')
const selectedUserId = ref<number | ''>('')
const successMessage = ref('')

onMounted(() => {
  // Fetch users for the dropdown
  userStore.fetchUsers()
})

const handleSubmit = async () => {
  if (!micropostTitle.value.trim() || !selectedUserId.value) return
  
  try {
    await micropostStore.createMicropost(micropostTitle.value.trim(), Number(selectedUserId.value))
    successMessage.value = `Micropost "${micropostTitle.value}" created successfully!`
    micropostTitle.value = ''
    selectedUserId.value = ''
    
    // Refresh user data to show updated micropost count
    userStore.fetchUsers()
    
    // Clear success message after 3 seconds
    setTimeout(() => {
      successMessage.value = ''
    }, 3000)
  } catch (error) {
    // Error is handled by the store
  }
}
</script>
