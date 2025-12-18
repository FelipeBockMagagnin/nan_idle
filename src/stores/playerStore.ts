import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { PlayerStats } from '@/types'

export const usePlayerStore = defineStore(
  'player',
  () => {
  const gold = ref<number>(0)

  const stats = ref<PlayerStats>({
    attack: 0,
    defence: 0,
  })

  function trainAttackStat(value: number): void {
    stats.value.attack += value;
  }

  function trainDefenceStat(value: number): void {
    stats.value.defence += value;
  }

  return {
    gold,
    stats,
    trainAttackStat,
    trainDefenceStat,
  }
},
  { persist: true }
)
