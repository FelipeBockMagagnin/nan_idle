import { Item } from '@/domain/entities/Item'

export interface IItemRepository {
  getItem(id: number): Item | null
}
