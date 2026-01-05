import { adventureZones } from '@/data/adventure_zones'
import type { AdventureZone } from '@/types'

export class AdventureZoneFactory {
  private static adventureZones: AdventureZone[] = adventureZones

  static getAdventureZone(id: number): AdventureZone | undefined {
    const zone = this.adventureZones.find((zone) => zone.id === id)
    if (zone) {
      return zone
    }
    return undefined
  }
}
