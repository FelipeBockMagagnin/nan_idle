import { Energy } from './Energy'
import Decimal from 'break_infinity.js'

describe('Energy', () => {
  let energy: Energy

  beforeEach(() => {
    energy = new Energy({
      allocated: new Decimal(10),
      current: new Decimal(100),
      max: new Decimal(100),
      power: new Decimal(1),
      regenerationRate: new Decimal(1)
    })
  })

  it('should create an energy instance with correct values', () => {
    expect(energy.current).toEqual(new Decimal(100))
    expect(energy.allocated).toEqual(new Decimal(10))
    expect(energy.max).toEqual(new Decimal(100))
    expect(energy.regenerationRate).toEqual(new Decimal(1))
    expect(energy.power).toEqual(new Decimal(1))
  })

  describe('energy getter', () => {
    it('should return the energy instance', () => {
      expect(energy.energy).toBe(energy)
    })
  })

  describe('getAvailableEnergy', () => {
    it('should return the difference between current and allocated energy', () => {
      const availableEnergy = energy.getAvailableEnergy()
      expect(availableEnergy).toEqual(new Decimal(90))
    })
  })

  describe('canAllocateEnergy', () => {
    it('should return true if the value is less than or equal to available energy', () => {
      const canAllocate = energy.canAllocateEnergy(new Decimal(90))
      expect(canAllocate).toBe(true)
    })

    it('should return false if the value is greater than available energy', () => {
      const canAllocate = energy.canAllocateEnergy(new Decimal(91))
      expect(canAllocate).toBe(false)
    })
  })

  describe('allocateEnergy', () => {
    it('should increase allocated energy if can allocate', () => {
      energy.allocateEnergy(new Decimal(50))
      expect(energy.allocated).toEqual(new Decimal(60))
    })

    it('should return true if allocation is successful', () => {
      const result = energy.allocateEnergy(new Decimal(50))
      expect(result).toBe(true)
    })

    it('should not change allocated energy if cannot allocate', () => {
      energy.allocateEnergy(new Decimal(100))
      expect(energy.allocated).toEqual(new Decimal(10))
    })

    it('should return false if allocation is unsuccessful', () => {
      const result = energy.allocateEnergy(new Decimal(100))
      expect(result).toBe(false)
    })
  })

  describe('regenerate', () => {
    it('should increase current energy based on regeneration rate and delta time', () => {
      energy.current = new Decimal(50)
      energy.regenerate(10)
      expect(energy.current).toEqual(new Decimal(60))
    })

    it('should not increase current energy beyond the max', () => {
      energy.regenerate(10)
      expect(energy.current).toEqual(new Decimal(100))
    })
  })

  describe('reclaimEnergy', () => {
    it('should decrease allocated energy', () => {
      energy.reclaimEnergy(new Decimal(5))
      expect(energy.allocated).toEqual(new Decimal(5))
    })

    it('should return true if reclamation is successful', () => {
      const result = energy.reclaimEnergy(new Decimal(5))
      expect(result).toBe(true)
    })

    it('should not reclaim more energy than allocated', () => {
      energy.reclaimEnergy(new Decimal(15))
      expect(energy.allocated).toEqual(new Decimal(10))
    })

    it('should return false if reclamation is unsuccessful', () => {
      const result = energy.reclaimEnergy(new Decimal(15))
      expect(result).toBe(false)
    })

    it('should return false if reclaiming would result in negative allocated energy', () => {
      const result = energy.reclaimEnergy(new Decimal(11))
      expect(result).toBe(false)
    })
  })

  describe('getEnergyRegenProgress', () => {
    it('should return the decimal part of current energy as a percentage', () => {
      energy.current = new Decimal(50.5)
      const progress = energy.getEnergyRegenProgress()
      expect(progress).toBeCloseTo(50)
    })
  })

  describe('increaseCap', () => {
    it('should increase the max energy', () => {
      energy.increaseCap(new Decimal(50))
      expect(energy.max).toEqual(new Decimal(150))
    })
  })

  describe('increaseRegenationRate', () => {
    it('should increase the regeneration rate', () => {
      energy.increaseRegenationRate(new Decimal(2))
      expect(energy.regenerationRate).toEqual(new Decimal(3))
    })
  })

  describe('increasePower', () => {
    it('should increase the power', () => {
      energy.increasePower(new Decimal(2))
      expect(energy.power).toEqual(new Decimal(3))
    })
  })
})
