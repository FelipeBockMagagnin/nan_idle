import Decimal from 'break_infinity.js'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { IBossRepository } from '@/domain/interfaces/repositories/IBossRepository'

export type FightBossTickResult = {
  playerDied: boolean
  bossDied: boolean
  xpGained: Decimal
}

export class FightBossTickUseCase {
  constructor(
    private playerRepository: IPlayerRepository,
    private bossRepository: IBossRepository
  ) {}

  execute(bossId: number, deltaTime: number): FightBossTickResult {
    const player = this.playerRepository.getPlayer()
    const enemy = this.bossRepository.getEnemy(bossId)

    const result: FightBossTickResult = {
      playerDied: false,
      bossDied: false,
      xpGained: new Decimal(0),
    }

    if (!enemy) return result

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
