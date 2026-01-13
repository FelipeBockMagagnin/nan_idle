import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { Adventure } from '@/domain/entities/Adventure'

export class GetAdventureUseCase {
  constructor(private adventureRepository: IAdventureRepository) {}

  execute(): Adventure {
    return this.adventureRepository.getAdventure()
  }
}
