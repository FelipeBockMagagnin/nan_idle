import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'
import { computed } from 'vue'

export const useInventoryStore = defineStore('inventory', () => {
  const { inventoryRepo, getInventoryStatsUseCase } = container

  const inventory = inventoryRepo.getInventory()

  const inventoryStats = computed(() => {
    return getInventoryStatsUseCase.execute()
  })

  return {
    inventory,
    inventoryStats,
  }
})
