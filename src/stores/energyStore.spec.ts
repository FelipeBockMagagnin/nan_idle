import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEnergyStore } from './energyStore'

describe('energyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with 0 current energy', () => {
      const store = useEnergyStore()
      expect(store.energy.current).toBe(0)
    })

    it('should start with 0 allocated energy', () => {
      const store = useEnergyStore()
      expect(store.energy.allocated).toBe(0)
    })
  })

  describe('regenEnergy', () => {
    it('should increase current energy by given value', () => {
      const store = useEnergyStore()
      store.regenEnergy(10)
      expect(store.energy.current).toBe(10)
    })

    it('should not exceed max energy', () => {
      const store = useEnergyStore()
      store.energy.current = 100
      store.regenEnergy(10)
      expect(store.energy.current).toBe(100)
    })
  })

  describe('allocateEnergy', () => {
    it('should allocate energy when available', () => {
      const store = useEnergyStore()
      store.energy.current = 50
      const result = store.allocateEnergy(20)
      expect(result).toBe(true)
      expect(store.energy.allocated).toBe(20)
    })

    it('should fail when insufficient energy available', () => {
      const store = useEnergyStore()
      store.energy.current = 10
      const result = store.allocateEnergy(20)
      expect(result).toBe(false)
      expect(store.energy.allocated).toBe(0)
    })

    it('should consider already allocated energy', () => {
      const store = useEnergyStore()
      store.energy.current = 30
      store.energy.allocated = 20
      const result = store.allocateEnergy(15)
      expect(result).toBe(false)
    })
  })

  describe('reclaimEnergy', () => {
    it('should reclaim allocated energy', () => {
      const store = useEnergyStore()
      store.energy.allocated = 20
      const result = store.reclaimEnergy(10)
      expect(result).toBe(true)
      expect(store.energy.allocated).toBe(10)
    })

    it('should fail when reclaiming more than allocated', () => {
      const store = useEnergyStore()
      store.energy.allocated = 5
      const result = store.reclaimEnergy(10)
      expect(result).toBe(false)
      expect(store.energy.allocated).toBe(5)
    })
  })

  describe('getAvailableEnergy', () => {
    it('should return current minus allocated', () => {
      const store = useEnergyStore()
      store.energy.current = 50
      store.energy.allocated = 20
      expect(store.getAvailableEnergy()).toBe(30)
    })
  })
})
