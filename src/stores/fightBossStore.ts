import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Enemy } from '@/types'

export const useFightBossStore = defineStore(
  'fightBoss',
  () => {
  const enemy = ref<Enemy>({
    hp: {
      current: 200,
      max: 200,
    },
  })

  function damageEnemy(value: number): void {
    if (enemy.value.hp.current - value <= 0) {
      defeatEnemy()
      return
    }

    enemy.value.hp.current -= value
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
  { persist: true }
)
