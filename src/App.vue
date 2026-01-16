<template>
  <main class="game-content">
    <RouterView />
  </main>

  <Sidebar :isOpen="true" />
  <Alert />
</template>

<script setup lang="ts">
import { onMounted } from 'vue'
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
</script>

<style scoped>
.game-content {
  margin-right: 150px;
}

@media (max-width: 768px) {
  .game-content {
    padding-bottom: 60px;
    margin-right: 0;
  }
}
</style>
