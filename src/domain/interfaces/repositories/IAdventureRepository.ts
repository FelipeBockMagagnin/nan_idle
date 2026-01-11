import { Boss } from '@/domain/entities/Boss'
import { AdventureZone } from '@/domain/entities/Adventure'
import { Adventure } from '@/domain/entities/Adventure'

export interface IAdventureRepository {
  getAdventure(): Adventure

  getAdventureZone(id: number): AdventureZone | null
  getAdventureZones(): AdventureZone[]
  createEnemy(id: number): Boss | null
}
