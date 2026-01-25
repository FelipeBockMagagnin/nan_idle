import { reactive } from 'vue'
import { IInventoryRepository } from '@/domain/interfaces/repositories/IInventoryRepository'
import { Inventory } from '@/domain/entities/Inventory'

let inventoryInstance: Inventory

export class InventoryRepository implements IInventoryRepository {
  getInventory(): Inventory {
    if (!inventoryInstance) {
      inventoryInstance = reactive(
        new Inventory({
          maxInventorySize: 10,
        })
      ) as Inventory
    }
    return inventoryInstance
  }
}
