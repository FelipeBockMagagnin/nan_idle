import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useEnergyStore = defineStore('energy', () => {
  const energy = ref({
    current: 1,
    max: 100,
  })

  function increaseEnergy(value) {
    if (energy.value.current + value > energy.value.max) {
      return false
    }

    energy.value.current += value
  }

  function decreaseEnergy(value) {
    if (energy.value.current - value < 0) {
      return false
    }

    energy.value.current -= value
  }

  return {
    energy,
    increaseEnergy,
    decreaseEnergy,
  }
})
