import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnergyStore = defineStore('energy', () => {
  const energy = ref({
    current: 0,
    allocated: 0,
    max: 100,
  })

  function allocateEnergy(value) {
    if (value > getAvaliableEnergy()) {
      return false
    }

    energy.value.allocated += value
    return true
  }

  function reclaimEnergy(value) {
    if (value > energy.value.allocated) {
      return false
    }

    if (energy.value.allocated - value < 0) {
      return false
    }

    energy.value.allocated -= value
    return true
  }

  function getAvaliableEnergy() {
    return energy.value.current - energy.value.allocated
  }

  function regenEnergy(value) {
    if (energy.value.current === energy.value.max) return

    energy.value.current += value
  }

  return {
    energy,
    regenEnergy,
    allocateEnergy,
    reclaimEnergy,
    getAvaliableEnergy,
  }
})
