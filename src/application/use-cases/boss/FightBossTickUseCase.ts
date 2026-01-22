import Decimal from 'break_infinity.js'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { IBossRepository } from '@/domain/interfaces/repositories/IBossRepository'
import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'
import { showAlert } from '@/application/services/AlertService'

export type FightBossTickResult = {
  playerDied: boolean
  bossDied: boolean
  xpGained: Decimal
}

export class FightBossTickUseCase {
  constructor(
    private playerRepository: IPlayerRepository,
    private bossRepository: IBossRepository,
    private bossFightRepository: IBossFightRepository
  ) {}

  execute(deltaTime: number): void {
    const bossFight = this.bossFightRepository.getBossFight()

    //spawn next enemy
    if (!bossFight.boss) {
      bossFight.setBoss(this.bossRepository.getEnemy(bossFight.bossId))
      return
    }

    if (!bossFight.isFighting()) {
      return
    }

    const player = this.playerRepository.getPlayer()

    // boss attacks player
    const playerDied = player.takeDamage(bossFight.boss.stats.attack, deltaTime)

    if (playerDied) {
      bossFight.changeFightingState(false)
      return
    }

    // player attacks boss
    const bossDied = bossFight.boss.takeDamage(player.stats.attack, deltaTime)

    if (bossDied) {
      bossFight.changeFightingState(false)
      player.increaseXp(bossFight.boss.stats.xp)
      showAlert(
        `${bossFight.boss.name} defeated. + ${bossFight.boss.stats.xp} XP`
      )
      bossFight.defeatBoss()
      return
    }

    // regen Boss HP
    bossFight.boss.regenerate(deltaTime)
  }
}
