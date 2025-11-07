import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const gold = ref(0)

  const energy = ref({
    current: 100,
    max: 100,
  })

  const stats = ref({
    attack: 0,
    defence: 0,
  })

  function allocateEnergy(amount) {
    if (energy.value.current - amount < 0) {
      return false
    }

    energy.value.current -= amount
  }

  function trainAttackStat() {
    stats.value.attack++
  }

  function trainDefenceStat() {
    stats.value.defence++
  }

  return {
    gold,
    energy,
    stats,
    allocateEnergy,
    trainAttackStat,
    trainDefenceStat,
  }
})
