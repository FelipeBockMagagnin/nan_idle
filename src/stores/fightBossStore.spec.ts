import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useFightBossStore } from './fightBossStore'

describe('fightBossStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.stubGlobal('alert', vi.fn())
  })

  describe('damageEnemy', () => {
    it('should reduce enemy HP by damage value', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = 100;
      store.damageEnemy(30)
      expect(store.enemy.hp.current).toBe(70)
    })

    it('should trigger defeat when HP reaches 0', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = 200;
      store.damageEnemy(200)
      expect(alert).toHaveBeenCalledWith('enemy defeated')
    })

    it('should trigger defeat when damage exceeds current HP', () => {
      const store = useFightBossStore()
      store.enemy.hp.current = 50
      store.damageEnemy(100)
      expect(alert).toHaveBeenCalledWith('enemy defeated')
    })
  })
})
