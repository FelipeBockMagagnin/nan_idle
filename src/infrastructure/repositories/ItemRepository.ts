import { IItemRepository } from '@/domain/interfaces/repositories/IItemRepository'
import { Item, ItemOptions } from '@/domain/entities/Item'
import { items } from '../data/items'

export class ItemRepository implements IItemRepository {
  private items: ItemOptions[] = items

  getItem(id: number): Item | null {
    const ItemData = this.items.find((i) => i.id === id)
    if (ItemData) {
      return new Item(ItemData)
    }
    return null
  }
}
