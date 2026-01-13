import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { showAlert } from '@/application/services/AlertService'
import { AdventureZoneRepository } from '@/infrastructure/repositories/AdventureZoneRepository'
import { RespawnEnemyUseCase } from './RespawnEnemyUseCase'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'

export class TickAdventureUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventurePlayerRepository: IAdventurePlayerRepository,
    private trainingRepository: ITrainingRepository
  ) {}

  execute(deltaTime: number): void {
    const adventure = this.adventureRepository.getAdventure()
    const player = this.adventurePlayerRepository.getAdventurePlayer()

    //Respawn Enemy
    const respawnEnemyUseCase = new RespawnEnemyUseCase(
      this.adventureRepository
    )
    respawnEnemyUseCase.execute(deltaTime)

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
        adventure.enterZone(AdventureZoneRepository.getAdventureZone(0))
        return
      }
    }

    // Regen Enemy HP
    adventure.currentEnemy.regenerate(deltaTime)
  }
}
