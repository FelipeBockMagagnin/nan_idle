import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'
import {
  XpUpgradeCost,
  XpUpgradeType,
} from '@/application/services/PlayerXpService'
import { showAlert } from '@/application/services/AlertService'

export const usePlayerStore = defineStore('player', () => {
  const { playerRepo, playerXpService } = container

  const playerEntity = playerRepo.getPlayer()
  const stats = playerEntity.stats
  const resources = playerEntity.resources

  const buyXpUpgrade = (type: XpUpgradeType) => {
    const buy = playerXpService.buyUpgrade(type)
    if (!buy) {
      showAlert('Insufficient XP')
      return
    }
  }

  const getUpdate = (type: XpUpgradeType): XpUpgradeCost => {
    return playerXpService.get(type)
  }

  return {
    resources,
    stats,
    buyXpUpgrade,
    getUpdate,
  }
})
