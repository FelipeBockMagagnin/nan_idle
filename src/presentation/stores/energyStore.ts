import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import { Energy } from '@/domain/entities/Energy'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import Decimal from 'break_infinity.js'
import { container } from '@/infrastructure/container'

export const useEnergyStore = defineStore('energy', () => {
  const { energyRepo, regenEnergyUseCase, getAvaliableEnergyUseCase } = container

  const energyEntity = energyRepo.getEnergy()
  const energy = ref<Energy>(energyEntity)

  const onGameTick = (deltaTime: number) => {
    regenEnergyUseCase.execute(deltaTime)
    triggerRef(energy)
  }

  gameLoop.subscribe(onGameTick)

  function getAvailableEnergy(): Decimal {
    return getAvaliableEnergyUseCase.execute()
  }

  return {
    energy,
    getAvailableEnergy,
  }
})
