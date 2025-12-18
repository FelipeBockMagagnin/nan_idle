<template>
  <div class="game-layout">
    <Sidebar />

    <main class="game-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useEnergyStore } from '@/stores/energyStore'

import Sidebar from '@/components/Sidebar.vue'

const energyStore = useEnergyStore()
let gameLoopInterval: ReturnType<typeof setInterval> | null = null

onMounted(() => {
  gameLoopInterval = setInterval(() => {
    energyStore.regenEnergy(1)
  }, 1000)
})

onUnmounted(() => {
  if (gameLoopInterval) {
    clearInterval(gameLoopInterval)
  }
})
</script>

<style></style>
