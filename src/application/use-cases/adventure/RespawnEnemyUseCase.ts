import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IAdventureZoneRepository } from '@/domain/interfaces/repositories/IAdventureZoneRepository'
import { AdventureEnemyRepository } from '@/infrastructure/repositories/AdventureEnemyRepository'

export class RespawnEnemyUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventureZoneRepository: IAdventureZoneRepository
  ) {}

  execute(deltaTime: number): void {
    const adventure = this.adventureRepository.getAdventure()

    if (adventure.currentEnemy) {
      if (adventure.currentEnemy?.stats.respawnTime > 0) {
        adventure.currentEnemy.decreaseRespawnTime(deltaTime)
        return
      }
    }

    if (!adventure.currentEnemy && adventure.zoneId !== 0) {
      const zone = this.adventureZoneRepository.getAdventureZone(
        adventure.zoneId
      )
      if (zone) {
        const enemyId = adventure.getNextEnemyId()
        const enemy = AdventureEnemyRepository.getEnemy(enemyId)
        if (enemy) {
          enemy.stats.hp = enemy?.stats.maxHp
          adventure.setEnemy(enemy)
        }
      }
    }
  }
}
