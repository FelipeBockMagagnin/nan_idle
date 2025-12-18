import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Energy } from '@/types'

export const useEnergyStore = defineStore('energy', () => {
  const energy = ref<Energy>({
    current: 0,
    allocated: 0,
    max: 100,
  })

  function allocateEnergy(value: number): boolean {
    if (value > getAvailableEnergy()) {
      return false
    }

    energy.value.allocated += value
    return true
  }

  function reclaimEnergy(value: number): boolean {
    if (value > energy.value.allocated) {
      return false
    }

    if (energy.value.allocated - value < 0) {
      return false
    }

    energy.value.allocated -= value
    return true
  }

  function getAvailableEnergy(): number {
    return energy.value.current - energy.value.allocated
  }

  function regenEnergy(value: number): void {
    if (energy.value.current === energy.value.max) return

    energy.value.current += value
  }

  return {
    energy,
    regenEnergy,
    allocateEnergy,
    reclaimEnergy,
    getAvailableEnergy,
  }
})
