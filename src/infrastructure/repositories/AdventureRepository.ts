import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { Adventure } from '@/domain/entities/Adventure'
import { reactive } from 'vue'

let adventureInstance: Adventure | null = null

export class AdventureRepository implements IAdventureRepository {
  getAdventure(): Adventure {
    if (!adventureInstance) {
      adventureInstance = reactive(new Adventure(null)) as Adventure
    }
    return adventureInstance
  }
}
