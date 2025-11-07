import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const gold = ref(0)

  const energy = ref({
    current: 1,
    max: 100,
  })

  const hp = ref({
    current: 100,
    max: 100,
  })

  const stats = ref({
    attack: 0,
    defence: 0,
  })

  function regenEnergy(value) {
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

  function changeHP(value) {
    if (hp.value.current - value < 0) {
      return false
    }

    hp.value.current += value
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
    hp,
    regenEnergy,
    decreaseEnergy,
    changeHP,
    trainAttackStat,
    trainDefenceStat,
  }
})
