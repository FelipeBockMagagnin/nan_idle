import { AdventureZone } from '@/domain/entities/Adventure'

export interface IAdventureZoneRepository {
  getAdventureZone(id: number): AdventureZone | null
  getAdventureZones(): AdventureZone[]
}
