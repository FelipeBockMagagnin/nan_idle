import { defineStore } from 'pinia'
import Decimal from 'break_infinity.js'
import { container } from '@/infrastructure/container'

export const useEnergyStore = defineStore('energy', () => {
  const { energyRepo, getAvaliableEnergyUseCase } = container

  const energy = energyRepo.getEnergy()

  function getAvailableEnergy(): Decimal {
    return getAvaliableEnergyUseCase.execute()
  }

  return {
    energy,
    getAvailableEnergy,
  }
})
