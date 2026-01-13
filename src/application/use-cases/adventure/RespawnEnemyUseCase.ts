import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { AdventureEnemyRepository } from '@/infrastructure/repositories/AdventureEnemyRepository'

export class RespawnEnemyUseCase {
  constructor(private adventureRepository: IAdventureRepository) {}

  execute(deltaTime: number): void {
    const adventure = this.adventureRepository.getAdventure()

    if (adventure.currentEnemy) {
      if (adventure.currentEnemy?.stats.respawnTime > 0) {
        adventure.currentEnemy.decreaseRespawnTime(deltaTime)
        return
      }
    }

    if (!adventure.currentEnemy && adventure.zoneId !== 0) {
      const zone = this.adventureRepository.getAdventureZone(adventure.zoneId)
      if (zone) {
        const enemyId = adventure.getNextEnemyId()
        const enemy = AdventureEnemyRepository.getEnemy(enemyId)
        if (enemy) {
          adventure.setEnemy(enemy)
        }
      }
    }
  }
}
