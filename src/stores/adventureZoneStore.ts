import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { type Enemy, type AdventureZone, Skill } from '@/types'
import { AdventureZoneFactory } from '@/services/AdventureZoneFactory'
import { EnemyFactory } from '@/services/EnemyFactory'
import { gameManager } from '@/services/gameManager'
import { showAlert } from '@/services/alertService'
import { usePlayerStore } from './playerStore'
import { TrainingSkills } from '@/enums'
import { useTrainingStore } from './trainingStore'

export const useAdventureZoneStore = defineStore(
  'adventureZone',
  () => {
    const adventureZoneId = ref<number>(0)
    const currentEnemy = ref<Enemy | null>(null)
    const selectedAttack = ref<Skill | null>(null)

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
      currentEnemy.value = null
      adventureZoneId.value = id
    }

    const trainingStore = useTrainingStore()
    function setSelectedAttack(skill: TrainingSkills) {
      selectedAttack.value = trainingStore.getSkill(skill)
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
      if (selectedAttack.value) {
        //TODO add selectedAttack multiplayer
        currentEnemy.value.stats.hp = currentEnemy.value.stats.hp.minus(
          selectedAttack.value.level
        )

        if (currentEnemy.value.stats.hp.lessThanOrEqualTo(0)) {
          defeatEnemy()
          return
        }

        selectedAttack.value = null
      }

      //Enemy Damage
      const playerStore = usePlayerStore()
      if (playerStore.dealDamage(currentEnemy.value.stats.attack)) {
        currentEnemy.value = null
        setAdventureZone(0)
        return
      }
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
        enemy.stats.hp = enemy.stats.maxHp
        currentEnemy.value = enemy
      }
    }

    function defeatEnemy(): void {
      if (!currentEnemy.value) return

      showAlert(`${currentEnemy.value.name} defeated.`)

      currentEnemy.value = null
      selectedAttack.value = null
    }

    return {
      adventureZone,
      currentEnemy,
      setAdventureZone,
      setSelectedAttack,
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
