import { BossFight } from '@/domain/entities/BossFight'
import { IPersistableRepository } from './IPersistableRepository'

export interface IBossFightRepository extends IPersistableRepository<number> {
  getBossFight(): BossFight
}
