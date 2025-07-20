<script setup lang="ts">
import UserList from './components/UserList.vue'
import UserForm from './components/UserForm.vue'
import MicropostList from './components/MicropostList.vue'
import MicropostForm from './components/MicropostForm.vue'
</script>

<template>
  <div class="min-h-screen bg-gray-50 py-8">
    <div class="max-w-6xl mx-auto px-4">
      <h1 class="text-3xl font-bold text-gray-900 mb-8 text-center">Vue Express App</h1>
      
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <!-- Users Section -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Create User</h2>
            <UserForm />
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Users</h2>
            <UserList />
          </div>
        </div>

        <!-- Microposts Section -->
        <div class="space-y-6">
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Create Micropost</h2>
            <MicropostForm />
          </div>
          
          <div class="bg-white rounded-lg shadow-md p-6">
            <h2 class="text-xl font-semibold text-gray-800 mb-4">Microposts</h2>
            <MicropostList />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
