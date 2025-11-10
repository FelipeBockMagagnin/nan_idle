import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFightBossStore = defineStore('fightBoss', () => {
  const enemy = ref({
    hp: {
      current: 200,
      max: 200,
    },
  })

  function damageEnemy(value) {
    if (enemy.value.hp.current - value <= 0) {
      defeatEnemy()
      return
    }

    enemy.value.hp.current -= value
  }

  function defeatEnemy() {
    alert('enemy defeated')
    //Todo progress to next enemy
  }

  return {
    enemy,
    damageEnemy,
  }
})
