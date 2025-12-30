import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useEnergyStore } from './energyStore'
import Decimal from 'break_infinity.js'

describe('energyStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('alert', vi.fn())
  })

  describe('initial state', () => {
    it('should start with 0 current energy', () => {
      const store = useEnergyStore()
      expect(store.energy.current).toStrictEqual(new Decimal(0))
    })

    it('should start with 0 allocated energy', () => {
      const store = useEnergyStore()
      expect(store.energy.allocated).toStrictEqual(new Decimal(0))
    })
  })

  describe('regenEnergy', () => {
    it('should increase current energy by given value', () => {
      const store = useEnergyStore()
      store.regenEnergy(new Decimal(10))
      expect(store.energy.current).toStrictEqual(new Decimal(10))
    })

    it('should not exceed max energy', () => {
      const store = useEnergyStore()
      store.energy.current = new Decimal(100)
      store.regenEnergy(new Decimal(10))
      expect(store.energy.current).toStrictEqual(new Decimal(100))
    })
  })

  describe('allocateEnergy', () => {
    it('should allocate energy when available', () => {
      const store = useEnergyStore()
      store.energy.current = new Decimal(50)
      const result = store.allocateEnergy(new Decimal(20))
      expect(result).toBe(true)
      expect(store.energy.allocated).toStrictEqual(new Decimal(20))
    })

    it('should fail when insufficient energy available', () => {
      const store = useEnergyStore()
      store.energy.current = new Decimal(10)
      const result = store.allocateEnergy(new Decimal(20))
      expect(result).toBe(false)
      expect(store.energy.allocated).toStrictEqual(new Decimal(0))
    })

    it('should consider already allocated energy', () => {
      const store = useEnergyStore()
      store.energy.current = new Decimal(30)
      store.energy.allocated = new Decimal(20)
      const result = store.allocateEnergy(new Decimal(15))
      expect(result).toBe(false)
    })
  })

  describe('reclaimEnergy', () => {
    it('should reclaim allocated energy', () => {
      const store = useEnergyStore()
      store.energy.allocated = new Decimal(20)
      const result = store.reclaimEnergy(new Decimal(10))
      expect(result).toBe(true)
      expect(store.energy.allocated).toStrictEqual(new Decimal(10))
    })

    it('should fail when reclaiming more than allocated', () => {
      const store = useEnergyStore()
      store.energy.allocated = new Decimal(5)
      const result = store.reclaimEnergy(new Decimal(10))
      expect(result).toBe(false)
      expect(store.energy.allocated).toStrictEqual(new Decimal(5))
    })
  })

  describe('getAvailableEnergy', () => {
    it('should return current minus allocated', () => {
      const store = useEnergyStore()
      store.energy.current = new Decimal(50)
      store.energy.allocated = new Decimal(20)
      expect(store.getAvailableEnergy()).toStrictEqual(new Decimal(30))
    })
  })
})
