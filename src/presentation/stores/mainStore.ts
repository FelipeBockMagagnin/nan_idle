import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'
import { ThemeOptionEnum } from '@/domain/enums'

export const useMainStore = defineStore('main', {
  state: () => ({
    version: 1,
    lastSaveTime: Date.now(),
    autoSaveInterval: null as NodeJS.Timeout | null,
    theme: ThemeOptionEnum.Windows98,
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

    changeTheme(theme: ThemeOptionEnum) {
      this.theme = theme
    },
  },
})
