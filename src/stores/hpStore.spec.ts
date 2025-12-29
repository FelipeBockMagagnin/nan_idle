import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useHPStore } from './hpStore'
import Decimal from 'break_infinity.js'

describe('hpStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should start with 100 current HP', () => {
      const store = useHPStore()
      expect(store.hp.current.eq(new Decimal(100))).toBe(true)
    })

    it('should start with 100 max HP', () => {
      const store = useHPStore()
      expect(store.hp.max.eq(new Decimal(100))).toBe(true)
    })
  })
})
