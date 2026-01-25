import { Inventory } from '@/domain/entities/Inventory'

export interface IInventoryRepository {
  getInventory(): Inventory
}
