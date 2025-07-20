<template>
  <div>
    <div v-if="userStore.loading" class="text-center py-4">
      <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      <span class="ml-2 text-gray-600">Loading users...</span>
    </div>
    
    <div v-else-if="userStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">Error: {{ userStore.error }}</p>
      <button 
        @click="userStore.fetchUsers()" 
        class="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
    
    <div v-else-if="userStore.users.length === 0" class="text-center py-8 text-gray-500">
      <p>No users found. Create your first user!</p>
    </div>
    
    <div v-else class="space-y-3">
      <div 
        v-for="user in userStore.users" 
        :key="user.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div>
            <h3 class="font-semibold text-gray-900">{{ user.name }}</h3>
            <p class="text-sm text-gray-500">ID: {{ user.id }}</p>
            <p class="text-xs text-gray-400">
              Created: {{ new Date(user.createdAt).toLocaleDateString() }}
            </p>
          </div>
          <div class="text-right">
            <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              {{ user.microposts.length }} posts
            </span>
          </div>
        </div>
        
        <div v-if="user.microposts.length > 0" class="mt-3 pt-3 border-t border-gray-100">
          <h4 class="text-sm font-medium text-gray-700 mb-2">Recent Posts:</h4>
          <div class="space-y-1">
            <div 
              v-for="post in user.microposts.slice(0, 3)" 
              :key="post.id"
              class="text-sm text-gray-600 bg-gray-50 rounded px-2 py-1"
            >
              {{ post.title }}
            </div>
            <div v-if="user.microposts.length > 3" class="text-xs text-gray-500">
              +{{ user.microposts.length - 3 }} more posts
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <button 
      @click="userStore.fetchUsers()" 
      class="mt-4 w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
    >
      Refresh Users
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

onMounted(() => {
  userStore.fetchUsers()
})
</script>
