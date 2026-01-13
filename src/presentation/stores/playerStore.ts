import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import Decimal from 'break_infinity.js'
import type { PlayerStats } from '@/domain/entities/Player'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { container } from '@/infrastructure/container'

export const usePlayerStore = defineStore('player', () => {
  const { playerRepo, regenHealthUseCase } = container

  const gold = ref<Decimal>(new Decimal(0))

  const playerEntity = playerRepo.getPlayer()
  const stats = ref<PlayerStats>(playerEntity.stats)

  const onGameTick = (deltaTime: number) => {
    regenHealthUseCase.execute(deltaTime)
    triggerRef(stats)
  }

  gameLoop.subscribe(onGameTick)

  return {
    gold,
    stats,
  }
})
