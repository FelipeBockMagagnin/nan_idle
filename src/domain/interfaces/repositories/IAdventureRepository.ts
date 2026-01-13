import { Adventure } from '@/domain/entities/Adventure'

export interface IAdventureRepository {
  getAdventure(): Adventure
}
