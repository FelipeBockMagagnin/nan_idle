import { describe, it, expect, beforeEach } from 'vitest'
import Decimal from 'break_infinity.js'
import { Boss, BossData } from './Boss'

describe('Adventure Enemy Entity', () => {
  let boss: Boss
  let initialStats: BossData

  beforeEach(() => {
    initialStats = {
      id: 1,
      name: 'test case',
      image: 'image test',
      background: 'background_1.png',
      stats: {
        attack: new Decimal(10),
        defence: new Decimal(5),
        hp: new Decimal(100),
        maxHp: new Decimal(100),
        hpRegen: new Decimal(1),
        xp: new Decimal(1)
      },
    }
    boss = new Boss(initialStats)
  })

  describe('getters', () => {
    describe('id', () => {
      it('should return the boss id', () => {
        expect(boss.id).toBe(1)
      })
    })

    describe('name', () => {
      it('should return the boss name', () => {
        expect(boss.name).toBe('test case')
      })
    })

    describe('image', () => {
      it('should return the boss image', () => {
        expect(boss.image).toBe('image test')
      })
    })
  })

  describe('regenerate', () => {
    it('should not regenerate if life is greater or equal to max HP', () => {
      const maxHP = boss.stats.maxHp
      boss.stats.hp = maxHP
      boss.regenerate(10)
      expect(boss.stats.hp).toBe(maxHP)
    })

    it('should regerate life equal to deltaTime * hpRegen', () => {
      boss.stats.hp = new Decimal(0)
      boss.regenerate(1)
      expect(boss.stats.hp.equals(boss.stats.hpRegen)).toBe(true)
    })

    it('should not regenerate more than MaxHp', () => {
      boss.regenerate(1000)
      expect(boss.stats.hp.equals(boss.stats.maxHp)).toBe(true)
    })
  })

  describe('takeDamage', () => {
    it('should reduce damage by toughness and apply to HP', () => {
      boss.takeDamage(new Decimal(10))
      expect(boss.stats.hp.equals(95)).toBe(true)
    })

    it('should not take damage if the damage is less than the defense', () => {
      boss.takeDamage(new Decimal(4))
      expect(boss.stats.hp.equals(100)).toBe(true)
    })

    it('should return true if damage kills the player', () => {
      const died = boss.takeDamage(new Decimal(1000))
      expect(died).toBe(true)
    })

    it('should return false if damage dont kills the player', () => {
      const died = boss.takeDamage(new Decimal(1))
      expect(died).toBe(false)
    })
  })
})
