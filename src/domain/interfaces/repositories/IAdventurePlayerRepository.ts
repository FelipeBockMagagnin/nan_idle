import { AdventurePlayer } from '@/domain/entities/AdventurePlayer'

export interface IAdventurePlayerRepository {
  getAdventurePlayer(): AdventurePlayer
}
