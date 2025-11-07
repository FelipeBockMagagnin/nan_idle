import { defineStore } from 'pinia'
import { ref } from 'vue'

export const usePlayerStore = defineStore('player', () => {
  const gold = ref(0)

  const energy = ref({
    current: 1,
    max: 100,
  })

  const stats = ref({
    attack: 0,
    defence: 0,
  })

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
    trainAttackStat,
    trainDefenceStat,
  }
})
