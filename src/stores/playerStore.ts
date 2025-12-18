import { defineStore } from 'pinia'
import { ref } from 'vue'
import Decimal from 'break_infinity.js'
import type { PlayerStats } from '@/types'

export const usePlayerStore = defineStore(
  'player',
  () => {
    const gold = ref<Decimal>(new Decimal(0))

    const stats = ref<PlayerStats>({
      attack: new Decimal(0),
      defence: new Decimal(0),
    })

    function trainAttackStat(value: Decimal): void {
      stats.value.attack = stats.value.attack.plus(value)
    }

    function trainDefenceStat(value: Decimal): void {
      stats.value.defence = stats.value.defence.plus(value)
    }

    return {
      gold,
      stats,
      trainAttackStat,
      trainDefenceStat,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) => JSON.stringify({
          gold: state.gold.toString(),
          stats: {
            attack: state.stats.attack.toString(),
            defence: state.stats.defence.toString(),
          },
        }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            gold: new Decimal(data.gold),
            stats: {
              attack: new Decimal(data.stats.attack),
              defence: new Decimal(data.stats.defence),
            },
          }
        },
      },
    },
  }
)
