import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'
import { ThemeOptionEnum, UnlockableEnum } from '@/domain/enums'

export const useMainStore = defineStore('main', {
  state: () => ({
    version: 1,
    lastSaveTime: Date.now(),
    autoSaveInterval: null as NodeJS.Timeout | null,
    theme: ThemeOptionEnum.Windows98,
  }),

  actions: {
    initGame(): void {
      const loaded = container.loadGameUseCase.execute()
      if (loaded) {
        console.log('Game Loaded')
      } else {
        console.log('Starting New Game')
      }

      this.autoSaveInterval = setInterval(() => this.saveGame(), 10000)
    },

    saveGame(): void {
      container.saveGameUseCase.execute()
      this.lastSaveTime = Date.now()
    },

    resetGame(): void {
      container.storageService.clear()
      window.location.reload()
    },

    changeTheme(theme: ThemeOptionEnum): void {
      this.theme = theme
    },

    isUnlocked(unlockable: UnlockableEnum): boolean {
      return container.featureUnlockedUseCase.execute(unlockable)
    },
  },
})
