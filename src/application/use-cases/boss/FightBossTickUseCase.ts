import Decimal from 'break_infinity.js'
import type { Enemy } from '@/domain/entities/Enemy'
import type { Player } from '@/domain/entities/Player'

export type FightBossTickResult = {
  playerDied: boolean
  bossDied: boolean
  xpGained: Decimal
}

export class FightBossTickUseCase {
  execute(player: Player, enemy: Enemy, deltaTime: number): FightBossTickResult {
    const result: FightBossTickResult = {
      playerDied: false,
      bossDied: false,
      xpGained: new Decimal(0),
    }

    // Regen Boss HP
    enemy.regenerateBossHP(deltaTime)

    // Player attacks Boss
    const playerDps = player.calculateDamage(enemy.bossStats.defence)
    if (playerDps.greaterThan(0)) {
      enemy.applyBossDamage(playerDps.multiply(deltaTime))

      if (enemy.bossStats.hp.equals(0)) {
        result.bossDied = true
        result.xpGained = enemy.bossStats.xp
        // If boss dies, we stop the fight tick logic for player damage?
        // Usually yes.
        return result
      }
    }

    // Boss attacks Player
    const bossDps = enemy.calculateBossDamage(player.stats.defence)
    if (bossDps.greaterThan(0)) {
      const died = player.applyDamage(bossDps.multiply(deltaTime))

      if (died) {
        result.playerDied = true
      }
    }

    return result
  }
}
