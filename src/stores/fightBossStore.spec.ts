import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFightBossStore } from './fightBossStore'

describe('fightBossStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('alert', vi.fn())
  })

  describe('changeFightState', () => {
    it('should change fighting to true if fighting is false', () => {
      const store = useFightBossStore()
      store.fighting = false
      store.changeFightState()
      expect(store.fighting).toBe(true)
    })
  })
})
