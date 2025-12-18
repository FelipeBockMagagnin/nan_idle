import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import Decimal from 'break_infinity.js'
import { usePlayerStore } from './playerStore'

describe('playerStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with 0 gold', () => {
      const store = usePlayerStore()
      expect(store.gold.toNumber()).toBe(0)
    })

    it('should start with 0 attack stat', () => {
      const store = usePlayerStore()
      expect(store.stats.attack.toNumber()).toBe(0)
    })

    it('should start with 0 defence stat', () => {
      const store = usePlayerStore()
      expect(store.stats.defence.toNumber()).toBe(0)
    })
  })

  describe('trainAttackStat', () => {
    it('should increment attack stat by 1', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(1))
      expect(store.stats.attack.toNumber()).toBe(1)
    })

    it('should accumulate attack stat', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(1))
      store.trainAttackStat(new Decimal(2))
      store.trainAttackStat(new Decimal(3))
      expect(store.stats.attack.toNumber()).toBe(6)
    })

    it('should handle small decimal values', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(0.001))
      store.trainAttackStat(new Decimal(0.002))
      expect(store.stats.attack.toNumber()).toBeCloseTo(0.003)
    })

    it('should handle very large numbers', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(1e50))
      store.trainAttackStat(new Decimal(1e50))
      expect(store.stats.attack.eq(new Decimal(2e50))).toBe(true)
    })

    it('should decrease attack stat with negative values', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(100))
      store.trainAttackStat(new Decimal(-30))
      expect(store.stats.attack.toNumber()).toBe(70)
    })

    it('should decrease large numbers correctly', () => {
      const store = usePlayerStore()
      store.trainAttackStat(new Decimal(1e100))
      store.trainAttackStat(new Decimal(-1e99))
      expect(store.stats.attack.eq(new Decimal(9e99))).toBe(true)
    })
  })

  describe('trainDefenceStat', () => {
    it('should increment defence stat by defined value', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(3))
      expect(store.stats.defence.toNumber()).toBe(3)
    })

    it('should accumulate defence stat', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(2))
      store.trainDefenceStat(new Decimal(1))
      expect(store.stats.defence.toNumber()).toBe(3)
    })

    it('should handle small decimal values', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(0.5))
      store.trainDefenceStat(new Decimal(0.25))
      expect(store.stats.defence.toNumber()).toBeCloseTo(0.75)
    })

    it('should handle very large numbers', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(1e200))
      expect(store.stats.defence.eq(new Decimal(1e200))).toBe(true)
    })

    it('should decrease defence stat with negative values', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(50))
      store.trainDefenceStat(new Decimal(-20))
      expect(store.stats.defence.toNumber()).toBe(30)
    })

    it('should decrease large numbers correctly', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(new Decimal(5e150))
      store.trainDefenceStat(new Decimal(-2e150))
      expect(store.stats.defence.eq(new Decimal(3e150))).toBe(true)
    })
  })
})
