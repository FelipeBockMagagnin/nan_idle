import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { Boss } from '@/domain/entities/Boss'
import { AdventureZoneRepository } from './AdventureZoneRepository'
import { BossRepository } from './BossRepository'
import { AdventureZone } from '@/domain/entities/Adventure'
import { Adventure } from '@/domain/entities/Adventure'

let adventureInstance: Adventure | null = null

export class AdventureRepository implements IAdventureRepository {
  getAdventure(): Adventure {
    if (!adventureInstance) {
      adventureInstance = new Adventure(
        AdventureZoneRepository.getAdventureZone(0)
      )
    }
    return adventureInstance
  }

  getAdventureZone(id: number): AdventureZone | null {
    return AdventureZoneRepository.getAdventureZone(id)
  }

  getAdventureZones(): AdventureZone[] {
    return AdventureZoneRepository.getAdventureZones()
  }

  createEnemy(id: number): Boss | null {
    return BossRepository.getEnemy(id)
  }
}
