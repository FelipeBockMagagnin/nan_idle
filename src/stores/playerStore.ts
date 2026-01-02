import { defineStore } from 'pinia'
import { ref } from 'vue'
import Decimal from 'break_infinity.js'
import type { PlayerStats } from '@/types'
import { gameManager } from '@/services/gameManager'

export const usePlayerStore = defineStore(
  'player',
  () => {
    const gold = ref<Decimal>(new Decimal(0))

    const stats = ref<PlayerStats>({
      attack: new Decimal(0),
      defence: new Decimal(0),
      currentHP: new Decimal(100),
      maxHP: new Decimal(100),
      hpRegen: new Decimal(1),
    })

    const onGameTick = (deltaTime: number) => {
      regenLife(deltaTime)
    }

    gameManager.subscribe(onGameTick)

    function trainAttackStat(value: Decimal): void {
      stats.value.attack = stats.value.attack.plus(value)
    }

    function trainDefenceStat(value: Decimal): void {
      stats.value.defence = stats.value.defence.plus(value)
    }

    /**
     *
     * @param value
     * @returns true if the player is dead
     */
    function dealDamage(value: Decimal): boolean {
      const newHP = stats.value.currentHP.minus(value)

      if (newHP.lessThanOrEqualTo(new Decimal(0))) {
        stats.value.currentHP = new Decimal(0)
        return true
      }

      stats.value.currentHP = newHP
      return false
    }

    function regenLife(deltaTime: number): void {
      if (stats.value.currentHP.greaterThanOrEqualTo(stats.value.maxHP)) {
        return
      }

      stats.value.currentHP = stats.value.currentHP.add(
        stats.value.hpRegen.multiply(deltaTime / 1000)
      )
    }

    return {
      gold,
      stats,
      trainAttackStat,
      trainDefenceStat,
      dealDamage,
      regenLife,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) =>
          JSON.stringify({
            gold: state.gold.toString(),
            stats: {
              attack: state.stats.attack.toString(),
              defence: state.stats.defence.toString(),
              hp: state.stats.hp.toString(),
            },
          }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            gold: new Decimal(data.gold),
            stats: {
              attack: new Decimal(data.stats.attack),
              defence: new Decimal(data.stats.defence),
              hp: new Decimal(data.stats.hp),
            },
          }
        },
      },
    },
  }
)
