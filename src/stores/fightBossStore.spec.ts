import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFightBossStore } from './fightBossStore'
import Decimal from 'break_infinity.js'

describe('fightBossStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('alert', vi.fn())
  })

  describe('damageEnemy', () => {
    it('should reduce enemy HP by damage value', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = new Decimal(100);
      store.damageEnemy(30)
      expect(store.enemy.hp.current.eq(new Decimal(70))).toBe(true)
    })

    it('should trigger defeat when HP reaches 0', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = new Decimal(200);
      store.damageEnemy(200)
      expect(alert).toHaveBeenCalledWith('enemy defeated')
    })

    it('should trigger defeat when damage exceeds current HP', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = new Decimal(50)
      store.damageEnemy(100)
      expect(alert).toHaveBeenCalledWith('enemy defeated')
    })
  })
})
