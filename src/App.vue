<template>
  <main class="game-content">
    <a @click="toggleSidebar" class="sidebar-toggle-btn">
      <v-icon name="gi-hamburger-menu" />
    </a>
    <RouterView />
  </main>

  <div
    v-if="isSidebarOpen"
    class="sidebar-backdrop"
    @click="toggleSidebar"
  ></div>
  <Sidebar :isOpen="isSidebarOpen" />
  <Alert />
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { RouterView } from 'vue-router'

import Sidebar from '@/presentation/components/Sidebar.vue'
import Alert from '@/presentation/components/Alert.vue'
import { useMainStore } from '@/presentation/stores/mainStore'
import { gameLoop } from '@/infrastructure/services/GameLoop'

const mainStore = useMainStore()

onMounted(() => {
  // 1. Initialize (Load Save)
  mainStore.initGame()

  // 2. Start Logic
  gameLoop.start()
})

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}
</script>

<style scoped>
.sidebar-toggle-btn {
  position: fixed;
  top: 10px;
  right: 10px;
  color: white;
  z-index: 1000;
  cursor: pointer;
}
</style>
