import { describe, it, expect, beforeEach } from 'vitest'
import Decimal from 'break_infinity.js'
import { AdventurePlayer, PlayerAdventureStats } from './AdventurePlayer'

describe('Adventure Player Entity', () => {
  let player: AdventurePlayer
  let initialStats: PlayerAdventureStats

  beforeEach(() => {
    initialStats = {
      power: new Decimal(10),
      toughness: new Decimal(5),
      currentHP: new Decimal(100),
      maxHP: new Decimal(100),
      hpRegen: new Decimal(1),
    }
    player = new AdventurePlayer(initialStats)
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

  describe('trainPower', () => {
    it('should increase power', () => {
      player.stats.power = new Decimal(1)
      player.trainPower(new Decimal(1))
      expect(player.stats.power.equals(2))
    })
  })

  describe('trainToughness', () => {
    it('should increase toughness', () => {
      player.stats.toughness = new Decimal(1)
      player.trainToughness(new Decimal(1))
      expect(player.stats.toughness.equals(2))
    })
  })

  describe('takeDamage', () => {
    it('should reduce damage by toughness and apply to HP', () => {
      player.takeDamage(new Decimal(10))
      expect(player.stats.currentHP.equals(92.5)).toBe(true)
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
})
