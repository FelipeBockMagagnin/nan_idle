import { reactive } from 'vue'
import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'
import { BossFight } from '@/domain/entities/BossFight'

let bossFightInstance: BossFight | null = null

export class BossFightRepository implements IBossFightRepository {
  getBossFight(): BossFight {
    if (!bossFightInstance) {
      bossFightInstance = reactive(new BossFight()) as BossFight
    }
    return bossFightInstance
  }
}
