import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import type { Enemy, AdventureZone } from '@/types'
import { AdventureZoneFactory } from '@/services/AdventureZoneFactory'
import { EnemyFactory } from '@/services/EnemyFactory'
import { gameManager } from '@/services/gameManager'
import { showAlert } from '@/services/alertService'

export const useAdventureZoneStore = defineStore(
  'adventureZone',
  () => {
    const adventureZoneId = ref<number>(0)
    const currentEnemy = ref<Enemy | null>(null)

    const adventureZone = computed<AdventureZone | undefined>(() => {
      return AdventureZoneFactory.getAdventureZone(adventureZoneId.value)
    })

    const onGameTick = (deltaTime: number) => {
      selectRandomEnemy()
      fightTick(deltaTime)
      regenLife(deltaTime)
    }

    gameManager.subscribe(onGameTick)

    function setAdventureZone(id: number) {
      adventureZoneId.value = id
    }

    function regenLife(deltaTime: number) {
      if (!currentEnemy.value) return

      if (
        currentEnemy.value.stats.hp.greaterThanOrEqualTo(
          currentEnemy.value.stats.maxHp
        )
      ) {
        return
      }

      currentEnemy.value.stats.hp = currentEnemy.value.stats.hp.add(
        currentEnemy.value.stats.hpRegen.multiply(deltaTime / 1000)
      )
    }

    function fightTick(deltaTime: number) {
      if (!currentEnemy.value) return

      //Player Damage
      console.log(deltaTime)
      //Enemy Damage
      defeatEnemy()
    }

    function selectRandomEnemy() {
      if (!adventureZone.value || adventureZone.value.id === 0) return

      if (currentEnemy.value) return

      const enemyId =
        adventureZone.value.enemyIds[
          Math.floor(Math.random() * adventureZone.value.enemyIds.length)
        ]
      const enemy = EnemyFactory.getEnemy(enemyId)
      if (enemy) {
        currentEnemy.value = enemy
      }
    }

    function defeatEnemy(): void {
      if (!currentEnemy.value) return

      showAlert(`${currentEnemy.value.name} defeated.`)

      currentEnemy.value = null
    }

    return {
      adventureZone,
      currentEnemy,
      setAdventureZone,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) =>
          JSON.stringify({
            adventureZoneId: state.adventureZoneId,
          }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            adventureZoneId: data.adventureZoneId,
          }
        },
      },
    },
  }
)
