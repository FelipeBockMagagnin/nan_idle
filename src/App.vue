<template>
  <div class="game-layout">
    <Sidebar />

    <main class="game-content">
      <RouterView />
    </main>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue'
import { RouterView } from 'vue-router'
import { useEnergyStore } from './stores/energyStore'

import Sidebar from './components/Sidebar.vue'

const energyStore = useEnergyStore()
let gameLoopInterval = null

onMounted(() => {
  gameLoopInterval = setInterval(() => {
    energyStore.increaseEnergy(1)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(gameLoopInterval)
})
</script>

<style></style>
