import { AdventureZone } from '@/domain/entities/Adventure';
import { IAdventureZoneRepository } from '@/domain/interfaces/repositories/IAdventureZoneRepository';

export class AdventureZoneService {
  constructor(private adventureZoneRepository: IAdventureZoneRepository) {}

  getAllAdventureZones(): AdventureZone[] {
    return this.adventureZoneRepository.getAdventureZones()
  }

  getAdventureZone(id: number) {
    return this.adventureZoneRepository.getAdventureZone(id)
  }
}