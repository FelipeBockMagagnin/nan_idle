import { Boost } from '@/domain/entities/Boost'
import { AnyItem } from '@/domain/types'

export interface IItemRepository {
  getItem(id: number): AnyItem | null
  getRandomItemBoostByLevel(level: number): Boost | null
}
