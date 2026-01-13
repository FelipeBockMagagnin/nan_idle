import { adventureZones } from '@/infrastructure/data/adventureZones'
import type { AdventureZone } from '@/domain/entities/Adventure'
import { IAdventureZoneRepository } from '@/domain/interfaces/repositories/IAdventureZoneRepository'

export class AdventureZoneRepository implements IAdventureZoneRepository {
  private adventureZones: AdventureZone[] = adventureZones

  getAdventureZone(id: number): AdventureZone | null {
    const zone = this.adventureZones.find((zone) => zone.id === id)
    if (zone) {
      return zone
    }
    return null
  }

  getAdventureZones(): AdventureZone[] {
    return this.adventureZones
  }
}
