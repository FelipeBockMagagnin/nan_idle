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
      background: 'background_1.png',
      isBoss: true,
      stats: {
        power: new Decimal(10),
        toughness: new Decimal(5),
        hp: new Decimal(100),
        maxHp: new Decimal(100),
        hpRegen: new Decimal(1),
        attackCooldown: 1,
        respawnTime: 1,
      },
    }
    enemy = new AdventureEnemy(initialStats)
  })

  describe('getters', () => {
    describe('id', () => {
      it('should return the enemy id', () => {
        expect(enemy.id).toBe(1)
      })
    })

    describe('name', () => {
      it('should return the enemy name', () => {
        expect(enemy.name).toBe('test case')
      })
    })

    describe('image', () => {
      it('should return the enemy image', () => {
        expect(enemy.image).toBe('image test')
      })
    })
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

    it('should not take damage if the damage is less than the defense', () => {
      enemy.takeDamage(new Decimal(1))
      expect(enemy.stats.hp.equals(100)).toBe(true)
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

  describe('AttackOnCooldown', () => {
    it('should return true if Attack cooldown is greater than 0', () => {
      enemy.currentAttackCooldown = 1
      expect(enemy.attackOnCooldown()).toBe(true)
    })

    it('should return false if attack cooldown is less or equal than 0', () => {
      enemy.currentAttackCooldown = 0
      expect(enemy.attackOnCooldown()).toBe(false)
    })
  })

  describe('resetAttackCooldown', () => {
    it('should make currentAttackCooldown equal to enemy attackColldown', () => {
      enemy.currentAttackCooldown = 0
      enemy.stats.attackCooldown = 10
      enemy.resetAttackCooldown()
      expect(enemy.currentAttackCooldown).toBe(10)
    })
  })

  describe('decreaseAttackCooldown', () => {
    it('should decrease attack cooldown by deltatime ammount', () => {
      const deltaTime = 0.1
      enemy.currentAttackCooldown = 1
      enemy.decreaseAttackCooldown(deltaTime)
      expect(enemy.currentAttackCooldown).toBe(0.9)
    })

    it('should not decrease attack cooldown below 0', () => {
      const deltaTime = 0.1
      enemy.currentAttackCooldown = 0.05
      enemy.decreaseAttackCooldown(deltaTime)
      expect(enemy.currentAttackCooldown).toBe(0)
    })

    it('should not decrease attack cooldown if it is already 0', () => {
      const deltaTime = 0.1
      enemy.currentAttackCooldown = 0
      enemy.decreaseAttackCooldown(deltaTime)
      expect(enemy.currentAttackCooldown).toBe(0)
    })
  })

  describe('getAttackCooldownPercent', () => {
    it('should return 100 if currentAttackCooldown is equal to enemy.attackcooldown', () => {
      enemy.currentAttackCooldown = 1
      enemy.stats.attackCooldown = 1
      expect(enemy.getAttackCooldownPercent()).toBe(100)
    })

    it('should return 20 if currentAttackCooldown is equal to 20% of enemy.attackcooldown', () => {
      enemy.currentAttackCooldown = 1
      enemy.stats.attackCooldown = 5
      expect(enemy.getAttackCooldownPercent()).toBe(20)
    })
  })

  describe('decreaseRespawnTime', () => {
    it('should decrease enemy cooldown time', () => {
      enemy.stats.respawnTime = 1
      enemy.decreaseRespawnTime(0.1)
      expect(enemy.stats.respawnTime).toBe(0.9)
    })

    it('should not decrease enemy cooldown time to bellow 0', () => {
      enemy.stats.respawnTime = 1
      enemy.decreaseRespawnTime(100)
      expect(enemy.stats.respawnTime).toBe(0)
    })

    it('should not decrease respawn time if it is already 0', () => {
      enemy.stats.respawnTime = 0
      enemy.decreaseRespawnTime(100)
      expect(enemy.stats.respawnTime).toBe(0)
    })
  })
})
