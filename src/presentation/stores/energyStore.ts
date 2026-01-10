import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import { Energy } from '@/domain/entities/Energy'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { EnergyRepository } from '@/infrastructure/repositories/EnergyRepository'
import Decimal from 'break_infinity.js'
import { RegenEnergyUseCase } from '@/application/use-cases/energy/RegenEnergyUseCase'

export const useEnergyStore = defineStore('energy', () => {
  const energyRepository = new EnergyRepository()

  const regenEnergyUseCase = new RegenEnergyUseCase(energyRepository)
  const energyEntity = energyRepository.getEnergy()
  const energy = ref<Energy>(energyEntity)

  const onGameTick = (deltaTime: number) => {
    regenEnergyUseCase.execute(deltaTime)
    triggerRef(energy)
  }

  gameLoop.subscribe(onGameTick)

  function getAvailableEnergy(): Decimal {
    return energyEntity.getAvailableEnergy()
  }

  return {
    energy,
    getAvailableEnergy,
  }
})
