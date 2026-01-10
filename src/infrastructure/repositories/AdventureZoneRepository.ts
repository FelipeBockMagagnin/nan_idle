import { adventureZones } from '@/infrastructure/data/adventure_zones'
import type { AdventureZone } from '@/domain/entities/Adventure'

export class AdventureZoneRepository {
  private static adventureZones: AdventureZone[] = adventureZones

  static getAdventureZone(id: number): AdventureZone | null {
    const zone = this.adventureZones.find((zone) => zone.id === id)
    if (zone) {
      return zone
    }
    return null
  }

  static getAdventureZones(): AdventureZone[] {
    return this.adventureZones
  }
}
