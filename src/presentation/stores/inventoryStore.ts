import { defineStore } from 'pinia'
import { container } from '@/infrastructure/container'

export const useInventoryStore = defineStore('inventory', () => {
  const { inventoryRepo } = container

  const inventory = inventoryRepo.getInventory()

  return {
    inventory,
  }
})
