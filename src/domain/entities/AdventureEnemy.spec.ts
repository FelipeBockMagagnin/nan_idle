import { describe, it, expect, beforeEach } from 'vitest'
import Decimal from 'break_infinity.js'
import { AdventureEnemy, AdventureEnemyData } from './AdventureEnemy'

describe('Adventure Enemy Entity', () => {
  let enemy: AdventureEnemy
  let initialStats: AdventureEnemyData

  beforeEach(() => {
    initialStats = {
      id: 1,
      name: 'test case',
      image: 'image test',
      stats: {
        power: new Decimal(10),
        toughness: new Decimal(5),
        hp: new Decimal(100),
        maxHp: new Decimal(100),
        hpRegen: new Decimal(1),
        goldDrop: new Decimal(1),
        itemsDrop: [],
        attackCooldown: 1,
        respawnTime: 1,
      },
    }
    enemy = new AdventureEnemy(initialStats)
  })

  describe('regenerate', () => {
    it('should not regenerate if life is greater or equal to max HP', () => {
      const maxHP = enemy.stats.maxHp
      enemy.stats.hp = maxHP
      enemy.regenerate(10)
      expect(enemy.stats.hp).toBe(maxHP)
    })

    it('should regerate life equal to deltaTime * hpRegen', () => {
      enemy.stats.hp = new Decimal(0)
      enemy.regenerate(1)
      expect(enemy.stats.hp.equals(enemy.stats.hpRegen)).toBe(true)
    })

    it('should not regenerate more than MaxHp', () => {
      enemy.regenerate(1000)
      expect(enemy.stats.hp.equals(enemy.stats.maxHp)).toBe(true)
    })
  })

  describe('takeDamage', () => {
    it('should reduce damage by toughness and apply to HP', () => {
      enemy.takeDamage(new Decimal(10))
      expect(enemy.stats.hp.equals(92.5)).toBe(true)
    })

    it('should return true if damage kills the player', () => {
      const died = enemy.takeDamage(new Decimal(1000))
      expect(died).toBe(true)
    })

    it('should return false if damage dont kills the player', () => {
      const died = enemy.takeDamage(new Decimal(1))
      expect(died).toBe(false)
    })
  })
})
