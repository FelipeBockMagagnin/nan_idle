import Decimal from 'break_infinity.js'
import type { Boss } from '@/domain/entities/Boss'
import type { Player } from '@/domain/entities/Player'

export type FightBossTickResult = {
  playerDied: boolean
  bossDied: boolean
  xpGained: Decimal
}

export class FightBossTickUseCase {
  execute(player: Player, enemy: Boss, deltaTime: number): FightBossTickResult {
    const result: FightBossTickResult = {
      playerDied: false,
      bossDied: false,
      xpGained: new Decimal(0),
    }

    // player attacks boss
    const bossDied = enemy.takeDamage(player.stats.attack)

    if (bossDied) {
      result.bossDied = true
      result.xpGained = enemy.stats.xp
      player.increaseXp(enemy.stats.xp)
      return result
    }

    // boss attacks player
    const playerDied = player.takeDamage(enemy.stats.attack)

    if (playerDied) {
      result.playerDied = true
      return result
    }

    // regen player hp
    player.regenerate(deltaTime)

    // regen Boss HP
    enemy.regenerate(deltaTime)

    return result
  }
}
