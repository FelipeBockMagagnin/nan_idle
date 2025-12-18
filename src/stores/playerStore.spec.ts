import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { usePlayerStore } from './playerStore'

describe('playerStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with 0 gold', () => {
      const store = usePlayerStore()
      expect(store.gold).toBe(0)
    })

    it('should start with 0 attack stat', () => {
      const store = usePlayerStore()
      expect(store.stats.attack).toBe(0)
    })

    it('should start with 0 defence stat', () => {
      const store = usePlayerStore()
      expect(store.stats.defence).toBe(0)
    })
  })

  describe('trainAttackStat', () => {
    it('should increment attack stat by 1', () => {
      const store = usePlayerStore()
      store.trainAttackStat(1)
      expect(store.stats.attack).toBe(1)
    })

    it('should accumulate attack stat', () => {
      const store = usePlayerStore()
      store.trainAttackStat(1)
      store.trainAttackStat(2)
      store.trainAttackStat(3)
      expect(store.stats.attack).toBe(6)
    })
  })

  describe('trainDefenceStat', () => {
    it('should increment defence stat by defined value', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(3)
      expect(store.stats.defence).toBe(3)
    })

    it('should accumulate defence stat', () => {
      const store = usePlayerStore()
      store.trainDefenceStat(2)
      store.trainDefenceStat(1)
      expect(store.stats.defence).toBe(3)
    })
  })
})
