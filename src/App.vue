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
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import { RouterView } from 'vue-router'
import { useEnergyStore } from '@/stores/energyStore'

import Sidebar from '@/components/Sidebar.vue'
import Decimal from 'break_infinity.js'

const energyStore = useEnergyStore()
let gameLoopInterval: ReturnType<typeof setInterval> | null = null

const isSidebarOpen = ref(false)

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value
}

onMounted(() => {
  gameLoopInterval = setInterval(() => {
    energyStore.regenEnergy(new Decimal(1))
  }, 1000)
})

onUnmounted(() => {
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval)
  }
})
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
