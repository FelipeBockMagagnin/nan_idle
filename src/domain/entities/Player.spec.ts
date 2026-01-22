import { describe, it, expect, beforeEach } from 'vitest'
import Decimal from 'break_infinity.js'
import { Player, PlayerResources, PlayerStats } from './Player'

describe('Player Entity', () => {
  let player: Player
  let initialStats: PlayerStats
  let playerInitialResources: PlayerResources

  beforeEach(() => {
    initialStats = {
      attack: new Decimal(10),
      defence: new Decimal(5),
      currentHP: new Decimal(100),
      maxHP: new Decimal(100),
      hpRegen: new Decimal(1),
    }

    playerInitialResources = {
      gold: new Decimal(0),
      xp: new Decimal(0),
    }
    player = new Player(initialStats, playerInitialResources)
  })

  describe('regenerate', () => {
    it('should not regenerate if life is greater or equal to max HP', () => {
      const maxHP = player.stats.maxHP
      player.stats.currentHP = maxHP
      player.regenerate(10)
      expect(player.stats.currentHP).toBe(maxHP)
    })

    it('should regerate life equal to deltaTime * hpRegen', () => {
      player.stats.currentHP = new Decimal(0)
      player.regenerate(1)
      expect(player.stats.currentHP.equals(player.stats.hpRegen)).toBe(true)
    })

    it('should not regenerate more than MaxHp', () => {
      player.regenerate(1000)
      expect(player.stats.currentHP.equals(player.stats.maxHP)).toBe(true)
    })
  })

  describe('trainAttack', () => {
    it('should set attack to value * level ^ 1.3', () => {
      player.stats.attack = new Decimal(100)
      player.trainAttack(new Decimal(150), new Decimal(2), new Decimal(0))
      expect(player.stats.attack.equals_tolerance(469.34, 0.01)).toBe(true)
    })

    it('should increase maxHp by a rate of value * 10', () => {
      player.stats.attack = new Decimal(100)
      player.trainAttack(new Decimal(150), new Decimal(2), new Decimal(0))
      expect(player.stats.maxHP.equals_tolerance(4693.4, 0.1)).toBe(true)
    })
  })

  describe('trainDefence', () => {
    it('should set defence to value * level ^ 1.3', () => {
      player.stats.defence = new Decimal(100)
      player.trainDefence(new Decimal(150), new Decimal(2), new Decimal(0))
      expect(player.stats.defence.equals_tolerance(469.34, 0.01)).toBe(true)
    })

    it('should set healthRegen to defence / 20', () => {
      player.stats.defence = new Decimal(100)
      player.trainDefence(new Decimal(150), new Decimal(2), new Decimal(0))
      expect(player.stats.hpRegen.equals_tolerance(23.465, 0.1)).toBe(true)
    })
  })

  describe('takeDamage', () => {
    it('should reduce damage by toughness and apply to HP', () => {
      player.takeDamage(new Decimal(10))
      expect(player.stats.currentHP.equals(95)).toBe(true)
    })

    it('should return true if damage kills the player', () => {
      const died = player.takeDamage(new Decimal(1000))
      expect(died).toBe(true)
    })

    it('should return false if damage dont kills the player', () => {
      const died = player.takeDamage(new Decimal(1))
      expect(died).toBe(false)
    })
  })

  describe('spendGold', () => {
    it('should decrease gold quantity by provided amount', () => {
      player.resources.gold = new Decimal(10)
      const spend = player.spendGold(new Decimal(9))
      expect(spend).toBe(true)
    })

    it('should not decrease gold quantity if dont have avaliable amount', () => {
      player.resources.gold = new Decimal(1)
      const spend = player.spendGold(new Decimal(9))
      expect(spend).toBe(false)
    })
  })

  describe('increaseGold', () => {
    it('should increase gold quantity by provided amount', () => {
      player.resources.gold = new Decimal(10)
      player.increaseGold(new Decimal(9))
      expect(player.resources.gold.equals(19)).toBe(true)
    })
  })

  describe('spendXp', () => {
    it('should decrease xp quantity by provided amount', () => {
      player.resources.xp = new Decimal(10)
      const spend = player.spendXp(new Decimal(9))
      expect(spend).toBe(true)
    })

    it('should not decrease xp quantity if dont have avaliable amount', () => {
      player.resources.xp = new Decimal(1)
      const spend = player.spendXp(new Decimal(9))
      expect(spend).toBe(false)
    })
  })

  describe('increaseXp', () => {
    it('should increase xp quantity by provided amount', () => {
      player.resources.xp = new Decimal(10)
      player.increaseXp(new Decimal(9))
      expect(player.resources.xp.equals(19)).toBe(true)
    })
  })
})
