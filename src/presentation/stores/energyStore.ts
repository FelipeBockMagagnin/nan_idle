import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import { Energy } from '@/domain/entities/Energy'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { EnergyRepository } from '@/infrastructure/repositories/EnergyRepository'
import Decimal from 'break_infinity.js'
import { RegenEnergyUseCase } from '@/application/use-cases/energy/RegenEnergyUseCase'
import { GetAvaliableEnergyUseCase } from '@/application/use-cases/energy/GetAvaliableEnergyUseCase'

export const useEnergyStore = defineStore('energy', () => {
  const energyRepository = new EnergyRepository()

  const regenEnergyUseCase = new RegenEnergyUseCase(energyRepository)
  const getAvaliableEnergyUseCase = new GetAvaliableEnergyUseCase(
    energyRepository
  )
  const energyEntity = energyRepository.getEnergy()
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
