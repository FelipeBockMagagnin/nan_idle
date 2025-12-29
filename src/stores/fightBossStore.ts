import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Enemy } from '@/types'
import Decimal from 'break_infinity.js'

export const useFightBossStore = defineStore(
  'fightBoss',
  () => {
  const enemy = ref<Enemy>({
    hp: {
      current: new Decimal(200),
      max: new Decimal(200),
    },
  })

  function damageEnemy(value: number): void {
    if (enemy.value.hp.current.minus(value).lessThanOrEqualTo(new Decimal(0))) {
      defeatEnemy()
      return
    }

    enemy.value.hp.current = enemy.value.hp.current.subtract(value)
  }

  function defeatEnemy(): void {
    alert('enemy defeated')
    // TODO: progress to next enemy
  }

  return {
    enemy,
    damageEnemy,
  }
},
  {
    persist: {
      serializer: {
        serialize: (state) => JSON.stringify({
          enemy: {
            hp: {
              current: state.enemy.hp.current.toString(),
              max: state.enemy.hp.max.toString(),
            },
          },
        }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            enemy: {
              hp: {
                current: new Decimal(data.enemy.hp.current),
                max: new Decimal(data.enemy.hp.max),
              },
            },
          }
        },
      },
    },
  }
)
