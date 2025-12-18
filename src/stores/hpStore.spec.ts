import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHPStore } from './hpStore'

describe('hpStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with 100 current HP', () => {
      const store = useHPStore()
      expect(store.hp.current).toBe(100)
    })

    it('should start with 100 max HP', () => {
      const store = useHPStore()
      expect(store.hp.max).toBe(100)
    })
  })
})
