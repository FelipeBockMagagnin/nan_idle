import { Adventure } from '@/domain/entities/Adventure'
import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IAdventureZoneRepository } from '@/domain/interfaces/repositories/IAdventureZoneRepository'

export class AdventureService {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventureZoneRepository: IAdventureZoneRepository
  ) {}

  getAdventure(): Adventure {
    return this.adventureRepository.getAdventure()
  }

  enterAdventureZone(id: number) {
    const adventure = this.adventureRepository.getAdventure()
    const adventureZone = this.adventureZoneRepository.getAdventureZone(id)

    if (!adventureZone) return
    adventure.enterZone(adventureZone)
  }
}
