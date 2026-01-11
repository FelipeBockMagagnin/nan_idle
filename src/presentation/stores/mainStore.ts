import { defineStore } from 'pinia'
import { LocalStorageService } from '@/infrastructure/services/LocalStorageService'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'
import { TrainingRepository } from '@/infrastructure/repositories/TrainingRepository'
import { SaveGameUseCase } from '@/application/use-cases/game/SaveGameUseCase'
import { LoadGameUseCase } from '@/application/use-cases/game/LoadGameUseCase'
import { EnergyRepository } from '@/infrastructure/repositories/EnergyRepository'

const storageService = new LocalStorageService()
const playerRepo = new PlayerRepository()
const trainingRepo = new TrainingRepository()
const energyRepo = new EnergyRepository()

const saveGameUseCase = new SaveGameUseCase(
  storageService,
  playerRepo,
  trainingRepo,
  energyRepo
)
const loadGameUseCase = new LoadGameUseCase(
  storageService,
  playerRepo,
  trainingRepo,
  energyRepo
)

export const useMainStore = defineStore('main', {
  state: () => ({
    version: 1,
    lastSaveTime: Date.now(),
    autoSaveInterval: null as NodeJS.Timeout | null,
  }),

  actions: {
    initGame() {
      const loaded = loadGameUseCase.execute()
      if (loaded) {
        console.log('Game Loaded')
      } else {
        console.log('Starting New Game')
      }

      this.autoSaveInterval = setInterval(() => this.saveGame(), 10000)
    },

    saveGame() {
      saveGameUseCase.execute()
      this.lastSaveTime = Date.now()
    },

    resetGame() {
      storageService.clear()
      window.location.reload()
    },

    // loadGame is no longer exposed or needed as an action since initGame handles it via UseCase
    // but if we need a manual load, we can add it.
  },
})
