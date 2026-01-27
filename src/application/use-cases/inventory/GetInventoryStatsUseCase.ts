import { ItemStats } from '@/domain/entities/BaseItem'
import { IInventoryRepository } from '@/domain/interfaces/repositories/IInventoryRepository'

export class GetInventoryStatsUseCase {
  constructor(private inventoryRepository: IInventoryRepository) {}

  execute(): ItemStats {
    const inventory = this.inventoryRepository.getInventory()
    return inventory.getAllEquippedItemsStats()
  }
}
