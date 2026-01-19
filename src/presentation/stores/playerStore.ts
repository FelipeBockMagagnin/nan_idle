import { defineStore } from 'pinia'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { container } from '@/infrastructure/container'
import { XpUpgradeType } from '@/application/services/PlayerXpService'
import Decimal from 'break_infinity.js'
import { showAlert } from '@/application/services/AlertService'

export const usePlayerStore = defineStore('player', () => {
  const { playerRepo, playerXpService, regenHealthUseCase } = container

  const playerEntity = playerRepo.getPlayer()
  const stats = playerEntity.stats
  const resources = playerEntity.resources

  const onGameTick = (deltaTime: number) => {
    regenHealthUseCase.execute(deltaTime)
  }

  gameLoop.subscribe(onGameTick)

  const buyXpUpgrade = (type: XpUpgradeType) => {
    const buy = playerXpService.buyUpgrade(type)
    if (!buy) {
      showAlert('Insufficient XP')
      return
    }
  }

  const getXpUpgradeCost = (type: XpUpgradeType): Decimal => {
    return playerXpService.getCost(type)
  }

  return {
    resources,
    stats,
    buyXpUpgrade,
    getXpUpgradeCost,
  }
})
