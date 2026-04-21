<template>
  <main class="game-content">
    <RouterView />
  </main>

  <Sidebar :isOpen="true" />
  <Alert />
</template>

<script setup lang="ts">
import { computed, onMounted, watchEffect } from 'vue'
import { RouterView, useRouter } from 'vue-router'

import Sidebar from '@/presentation/components/Sidebar.vue'
import Alert from '@/presentation/components/Alert.vue'
import { useMainStore } from '@/presentation/stores/mainStore'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { GameService } from '@/application/services/GameService'
import { navigationService } from '@/application/services/NavigationService'

const mainStore = useMainStore()
const router = useRouter()
const theme = computed(() => mainStore.theme)

const loadTheme = (theme: string) => {
  const head = document.head
  const link = document.createElement('link')
  const oldLink = document.getElementById('theme-link')

  link.id = 'theme-link'
  link.rel = 'stylesheet'
  link.href = `/assets/css/themes/${theme}.css`

  if (oldLink) {
    head.removeChild(oldLink)
  }
  head.appendChild(link)
}

onMounted(() => {
  // 1. Initialize (Load Save)
  mainStore.initGame()
  loadTheme(theme.value)

  const gameService = new GameService(gameLoop)
  gameService.start()

  navigationService.subscribe((routeName) => {
    router.push({ name: routeName })
  })
})

watchEffect(() => {
  loadTheme(theme.value)
})
</script>

<style scoped>
.game-content {
  margin-right: 150px;
  height: 100vh;
}

@media (max-width: 768px) {
  .game-content {
    margin-right: 0;
  }
}
</style>
