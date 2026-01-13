import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { AdventurePlayer } from '@/domain/entities/AdventurePlayer'

export class AdventurePlayerService {
  constructor(private adventurePlayerRepository: IAdventurePlayerRepository) {}

  getAdventurePlayer(): AdventurePlayer {
    return this.adventurePlayerRepository.getAdventurePlayer()
  }
}