import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { AdventurePlayer } from '@/domain/entities/AdventurePlayer'

export class GetAdventurePlayerUseCase {
  constructor(private adventurePlayerRepository: IAdventurePlayerRepository) {}

  execute(): AdventurePlayer {
    return this.adventurePlayerRepository.getAdventurePlayer()
  }
}