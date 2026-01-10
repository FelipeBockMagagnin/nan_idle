import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { AdventureZoneRepository } from '@/infrastructure/repositories/AdventureZoneRepository'

export class EnterZoneUseCase {
  constructor(private adventureRepository: IAdventureRepository) {}

  execute(zoneId: number): void {
    const adventure = this.adventureRepository.getAdventure()
    adventure.enterZone(AdventureZoneRepository.getAdventureZone(zoneId))
  }
}
