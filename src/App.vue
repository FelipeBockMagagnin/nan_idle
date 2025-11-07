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
import { usePlayerStore } from './stores/playerStore'

import Sidebar from './components/Sidebar.vue'
import EnergyBar from './components/EnergyBar.vue'

const playerStore = usePlayerStore()
let gameLoopInterval = null

onMounted(() => {
  gameLoopInterval = setInterval(() => {
    playerStore.regenEnergy(1)
  }, 1000)
})

onUnmounted(() => {
  clearInterval(gameLoopInterval)
})
</script>

<style></style>
