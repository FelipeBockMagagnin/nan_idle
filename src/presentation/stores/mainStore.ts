import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'

export const useMainStore = defineStore('main', {
  state: () => ({
    version: 1,
    lastSaveTime: Date.now(),
    autoSaveInterval: null as NodeJS.Timeout | null,
  }),

  actions: {
    initGame() {
      const loaded = container.loadGameUseCase.execute()
      if (loaded) {
        console.log('Game Loaded')
      } else {
        console.log('Starting New Game')
      }

      this.autoSaveInterval = setInterval(() => this.saveGame(), 10000)
    },

    saveGame() {
      container.saveGameUseCase.execute()
      this.lastSaveTime = Date.now()
    },

    resetGame() {
      container.storageService.clear()
      window.location.reload()
    },

    // loadGame is no longer exposed or needed as an action since initGame handles it via UseCase
    // but if we need a manual load, we can add it.
  },
})
