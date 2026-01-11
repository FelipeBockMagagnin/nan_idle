import { defineStore } from 'pinia'
import { ref } from 'vue'
import { Boss } from '@/domain/entities/Boss'
import { BossRepository } from '@/infrastructure/repositories/BossRepository'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { showAlert } from '@/application/services/AlertService'
import { FightBossTickUseCase } from '@/application/use-cases/boss/FightBossTickUseCase'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'

export const useFightBossStore = defineStore('fightBoss', () => {
  const enemy = ref<Boss | null>(null)
  const currentBossIndex = ref<number>(1)
  const fighting = ref<boolean>(false)

  const playerRepository = new PlayerRepository()
  const fightBossTickUseCase = new FightBossTickUseCase()

  if (!enemy.value || currentBossIndex.value) {
    setBoss(currentBossIndex.value)
  }

  const onGameTick = (deltaTime: number) => {
    if (!enemy.value) return

    fightTick(deltaTime)
  }

  gameLoop.subscribe(onGameTick)

  function setBoss(index: number) {
    const boss = BossRepository.getEnemy(index)
    if (boss) {
      enemy.value = boss
    }
  }

  function fightTick(deltaTime: number) {
    if (!fighting.value || !enemy.value) return

    const player = playerRepository.getPlayer()

    const result = fightBossTickUseCase.execute(
      player,
      enemy.value as Boss,
      deltaTime
    )

    if (result.bossDied) {
      defeatEnemy()
      return
    }

    if (result.playerDied) {
      changeFightState()
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
})
