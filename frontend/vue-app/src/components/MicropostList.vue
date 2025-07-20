<template>
  <div>
    <div v-if="micropostStore.loading" class="text-center py-4">
      <div class="inline-block animate-spin rounded-full h-6 w-6 border-b-2 border-green-600"></div>
      <span class="ml-2 text-gray-600">Loading microposts...</span>
    </div>
    
    <div v-else-if="micropostStore.error" class="bg-red-50 border border-red-200 rounded-md p-4">
      <p class="text-red-800">Error: {{ micropostStore.error }}</p>
      <button 
        @click="micropostStore.fetchMicroposts()" 
        class="mt-2 px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
      >
        Retry
      </button>
    </div>
    
    <div v-else-if="micropostStore.microposts.length === 0" class="text-center py-8 text-gray-500">
      <p>No microposts found. Create your first micropost!</p>
    </div>
    
    <div v-else class="space-y-3">
      <div 
        v-for="micropost in micropostStore.microposts" 
        :key="micropost.id"
        class="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
      >
        <div class="flex justify-between items-start">
          <div class="flex-1">
            <h3 class="font-semibold text-gray-900 mb-1">{{ micropost.title }}</h3>
            <div class="flex items-center space-x-2 text-sm text-gray-500">
              <span class="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-gray-100 text-gray-800">
                by {{ micropost.user.name }}
              </span>
              <span>•</span>
              <span>{{ new Date(micropost.createdAt).toLocaleDateString() }}</span>
            </div>
          </div>
          <div class="text-right">
            <p class="text-xs text-gray-400">ID: {{ micropost.id }}</p>
          </div>
        </div>
      </div>
    </div>
    
    <button 
      @click="micropostStore.fetchMicroposts()" 
      class="mt-4 w-full px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 transition-colors"
    >
      Refresh Microposts
    </button>
  </div>
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
import { useMicropostStore } from '../stores/micropostStore'

const micropostStore = useMicropostStore()

onMounted(() => {
  micropostStore.fetchMicroposts()
})
</script>
