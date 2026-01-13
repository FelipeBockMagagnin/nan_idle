import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { showAlert } from '@/application/services/AlertService'
import { RespawnEnemyUseCase } from './RespawnEnemyUseCase'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IAdventureZoneRepository } from '@/domain/interfaces/repositories/IAdventureZoneRepository'

export class TickAdventureUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventurePlayerRepository: IAdventurePlayerRepository,
    private trainingRepository: ITrainingRepository,
    private adventureZoneRepository: IAdventureZoneRepository,
    private respawnEnemyUseCase: RespawnEnemyUseCase
  ) {}

  execute(deltaTime: number): void {
    const adventure = this.adventureRepository.getAdventure()
    const player = this.adventurePlayerRepository.getAdventurePlayer()

    //Respawn Enemy
    this.respawnEnemyUseCase.execute(deltaTime)

    // decrease player skills cooldown
    const skills = this.trainingRepository.getSkills()
    skills.forEach((skill) => {
      skill.decreaseAttackCooldown(deltaTime)
    })

    // Regen Player HP
    player.regenerate(deltaTime)

    if (!adventure.currentEnemy) return

    // Enemy Attacks Player
    adventure.currentEnemy.decreaseAttackCooldown(deltaTime)
    if (!adventure.currentEnemy.attackOnCooldown()) {
      const playerDied = player.takeDamage(adventure.currentEnemy.stats.power)
      adventure.currentEnemy.resetAttackCooldown()
      if (playerDied) {
        showAlert('You died!')
        adventure.clearEnemy()
        adventure.enterZone(this.adventureZoneRepository.getAdventureZone(0))
        return
      }
    }

    // Regen Enemy HP
    adventure.currentEnemy.regenerate(deltaTime)
  }
}
