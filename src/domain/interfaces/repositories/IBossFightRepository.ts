import { BossFight } from '@/domain/entities/BossFight'

export interface IBossFightRepository {
  getBossFight(): BossFight
}
