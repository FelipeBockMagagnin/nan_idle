import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import Decimal from 'break_infinity.js'
import type { PlayerStats } from '@/domain/entities/Player'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'
import { RegenHealthUseCase } from '@/application/use-cases/player/RegenHealthUseCase'

export const usePlayerStore = defineStore('player', () => {
  const gold = ref<Decimal>(new Decimal(0))

  const playerRepository = new PlayerRepository()
  const regenHealthUseCase = new RegenHealthUseCase(playerRepository)

  const playerEntity = playerRepository.getPlayer()
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
