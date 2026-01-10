import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { AdventureZone } from '@/domain/entities/Adventure'

export class GetAdventureZonesUseCase {
  constructor(private adventureRepository: IAdventureRepository) {}

  execute(): AdventureZone[] {
    return this.adventureRepository.getAdventureZones()
  }
}
