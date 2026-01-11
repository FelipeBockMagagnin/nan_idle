import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { showAlert } from '@/application/services/AlertService'
import { AdventureZoneRepository } from '@/infrastructure/repositories/AdventureZoneRepository'

export class TickAdventureUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private playerRepository: IPlayerRepository
  ) {}

  execute(deltaTime: number): void {
    const adventure = this.adventureRepository.getAdventure()
    const player = this.playerRepository.getPlayer()

    if (!adventure.currentEnemy && adventure.zoneId !== 0) {
      const zone = this.adventureRepository.getAdventureZone(adventure.zoneId)
      if (zone) {
        const enemyId = adventure.getNextEnemyId()
        const enemy = this.adventureRepository.createEnemy(enemyId)
        if (enemy) {
          enemy.stats.hp = enemy.stats.maxHp
          adventure.setEnemy(enemy)
        }
      }
    }

    const result = adventure.tick(deltaTime, player)

    if (result.enemyDefeated) {
      showAlert(`Enemy defeated.`)
    }

    if (result.playerDied) {
      showAlert('You died!')
      adventure.enterZone(AdventureZoneRepository.getAdventureZone(0))
    }
  }
}
