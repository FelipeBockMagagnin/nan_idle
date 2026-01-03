import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Boss } from '@/types'
import Decimal from 'break_infinity.js'
import { BossFactory } from '@/services/BossFactory'
import { gameManager } from '@/services/gameManager'
import { usePlayerStore } from './playerStore'
import { showAlert } from '@/services/alertService'

export const useFightBossStore = defineStore(
  'fightBoss',
  () => {
    const enemy = ref<Boss | null>(null)
    const currentBossIndex = ref<number>(0)
    const fighting = ref<boolean>(false)

    // Set the initial boss
    if (!currentBossIndex.value) {
      setBoss(currentBossIndex.value)
    }

    const onGameTick = (deltaTime: number) => {
      fightTick(deltaTime)
      regenLife(deltaTime)
    }

    gameManager.subscribe(onGameTick)

    function setBoss(index: number) {
      const boss = BossFactory.getBoss(index)
      if (boss) {
        enemy.value = boss
      }
    }

    function regenLife(deltaTime: number) {
      if (!enemy.value) return

      if (enemy.value.stats.hp.greaterThanOrEqualTo(enemy.value.stats.maxHp)) {
        return
      }

      enemy.value.stats.hp = enemy.value.stats.hp.add(
        enemy.value.stats.hpRegen.multiply(deltaTime / 1000)
      )
    }

    function fightTick(deltaTime: number) {
      if (!fighting.value || !enemy.value) return

      //Player Damage
      const playerStore = usePlayerStore()

      const playerDamage = playerStore.stats.attack.minus(
        enemy.value.stats.defence
      )

      if (playerDamage.greaterThan(new Decimal(0))) {
        enemy.value.stats.hp = enemy.value?.stats.hp.minus(
          playerDamage.multiply(deltaTime / 1000)
        )

        if (enemy.value.stats.hp.lessThanOrEqualTo(new Decimal(0))) {
          defeatEnemy()
        }
      }

      //Boss Damage
      const bossDamage = enemy.value.stats.attack.minus(
        playerStore.stats.defence
      )

      if (bossDamage.greaterThan(new Decimal(0))) {
        playerStore.stats.currentHP = playerStore.stats.currentHP.minus(
          bossDamage.multiply(deltaTime / 1000)
        )

        if (playerStore.stats.currentHP.lessThanOrEqualTo(new Decimal(0))) {
          changeFightState()
        }
      }
    }

    function advanceToNextBoss() {
      currentBossIndex.value += 1
    }

    function defeatEnemy(): void {
      if (!enemy.value) return

      showAlert(`${enemy.value.name} defeated. + ${enemy.value.stats.xp} XP`)
      advanceToNextBoss()
      changeFightState()
      setBoss(currentBossIndex.value)
    }

    function changeFightState(): boolean {
      fighting.value = !fighting.value
      return fighting.value
    }

    return {
      enemy,
      fighting,
      setBoss,
      changeFightState,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) =>
          JSON.stringify({
            currentBossIndex: state.currentBossIndex,
          }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            currentBossIndex: data.currentBossIndex,
          }
        },
      },
    },
  }
)
