import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { AdventureZone } from '@/domain/entities/Adventure'

export class GetAdventureZoneUseCase {
  constructor(private adventureRepository: IAdventureRepository) {}

  execute(id: number): AdventureZone | null {
    return this.adventureRepository.getAdventureZone(id)
  }
}
