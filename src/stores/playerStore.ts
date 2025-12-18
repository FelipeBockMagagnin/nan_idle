import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PlayerEnergy, PlayerStats } from '@/types'

export const usePlayerStore = defineStore('player', () => {
  const gold = ref<number>(0)

  const energy = ref<PlayerEnergy>({
    current: 1,
    max: 100,
  })

  const stats = ref<PlayerStats>({
    attack: 0,
    defence: 0,
  })

  function trainAttackStat(): void {
    stats.value.attack++
  }

  function trainDefenceStat(): void {
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
