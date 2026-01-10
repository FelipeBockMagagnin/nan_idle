import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { Enemy } from '@/domain/entities/Enemy'
import { AdventureZoneRepository } from './AdventureZoneRepository'
import { EnemyRepository } from './EnemyRepository'
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

  createEnemy(id: number): Enemy | null {
    return EnemyRepository.getEnemy(id)
  }
}
