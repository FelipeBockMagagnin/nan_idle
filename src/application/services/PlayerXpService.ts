import Decimal from 'break_infinity.js'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import { GameConfig } from '@/infrastructure/config/GameConfig'

export enum XpUpgradeType {
  ENERGY_CAP = 'ENERGY_CAP',
  ENERGY_REGENERATION_RATE = 'ENERGY_REGENATION_RATE',
  ENERGY_POWER = 'ENERGY_POWER',
}

export type XpUpgradeCost = {
  cost: number
  gain: number
}

export type SpendXpCosts = Record<XpUpgradeType, XpUpgradeCost>

export class PlayerXpService {
  constructor(
    private playerRepository: IPlayerRepository,
    private energyRepository: IEnergyRepository
  ) {}

  private readonly SPEND_XP_COSTS: SpendXpCosts = GameConfig.SPEND_XP_COSTS

  getCost(type: XpUpgradeType, amountToBuy: number = 1): Decimal {
    const baseCost = this.SPEND_XP_COSTS[type].cost
    return new Decimal(baseCost).multiply(amountToBuy)
  }

  buyUpgrade(type: XpUpgradeType, amountToBuy: number = 1): boolean {
    const totalCost = this.getCost(type, amountToBuy)

    const player = this.playerRepository.getPlayer()

    if (!player.spendXp(totalCost)) {
      return false
    }

    const baseGain = this.SPEND_XP_COSTS[type].gain
    const totalGain = new Decimal(baseGain).multiply(amountToBuy)

    const energy = this.energyRepository.getEnergy()

    switch (type) {
      case XpUpgradeType.ENERGY_CAP:
        energy.increaseCap(totalGain)
        break
      case XpUpgradeType.ENERGY_REGENERATION_RATE:
        energy.increaseRegenationRate(totalGain)
        break
      case XpUpgradeType.ENERGY_POWER:
        energy.increasePower(totalGain)
    }

    return true
  }

  canBuyUpgrade(type: XpUpgradeType, amountToBuy: number = 1): boolean {
    const totalCost = this.getCost(type, amountToBuy)

    const player = this.playerRepository.getPlayer()

    return player.canSpendXpAmount(totalCost)
  }

  gainExp(amount: Decimal) {
    const player = this.playerRepository.getPlayer()
    player.increaseXp(amount)
  }
}
