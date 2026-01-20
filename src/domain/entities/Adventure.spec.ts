import { Adventure, AdventureZone } from './Adventure'
import { AdventureEnemy, AdventureEnemyData } from './AdventureEnemy'
import { Skill, SkillOptions } from './Skill'
import Decimal from 'break_infinity.js'

const mockEnemyData: AdventureEnemyData = {
  id: 1,
  name: 'Test Enemy',
  image: 'test.png',
  stats: {
    hp: new Decimal(100),
    maxHp: new Decimal(100),
    power: new Decimal(10),
    toughness: new Decimal(5),
    hpRegen: new Decimal(1),
    goldDrop: new Decimal(10),
    itemsDrop: [],
    respawnTime: 10,
    attackCooldown: 2,
  },
}

const mockSkill = new Skill({} as SkillOptions)

describe('Adventure', () => {
  let adventure: Adventure
  let adventureZone: AdventureZone

  beforeEach(() => {
    adventureZone = {
      enemyIds: [1, 2, 3],
      name: 'Adventure Test',
      id: 1,
    }
    adventure = new Adventure(adventureZone)
  })

  it('should set the adventure zone on creation', () => {
    expect(adventure.AdventureZone).toBe(adventureZone)
  })

  describe('zoneId', () => {
    it('should return the current zone id', () => {
      expect(adventure.zoneId).toBe(adventureZone.id)
    })

    it('should return 0 if there is no zone', () => {
      adventure.enterZone(null)
      expect(adventure.zoneId).toBe(0)
    })
  })

  describe('enterZone', () => {
    it('should change current adventure zone to the new one', () => {
      const newAdventureZone = {
        id: 3,
        name: 'Test',
        enemyIds: [1],
      }
      adventure.enterZone(newAdventureZone)

      expect(adventure.AdventureZone).toBe(newAdventureZone)
    })

    it('should set currentEnemy and playerSelectedAttack to null', () => {
      const enemy = new AdventureEnemy(mockEnemyData)
      adventure.setEnemy(enemy)

      adventure.setPlayerAtack(mockSkill)

      adventure.enterZone(adventureZone)

      expect(adventure.currentEnemy).toBeNull()
      expect(adventure.playerSelectedAttack).toBeNull()
    })
  })

  describe('getNextEnemyId', () => {
    it('should return a valid enemy id from the adventure zone', () => {
      const enemyId = adventure.getNextEnemyId()
      expect(adventureZone.enemyIds).toContain(enemyId)
    })

    it('should return 0 if there is no adventure zone', () => {
      adventure.enterZone(null)
      const enemyId = adventure.getNextEnemyId()
      expect(enemyId).toBe(0)
    })
  })

  describe('setEnemy', () => {
    it('should set the current enemy', () => {
      const enemy = new AdventureEnemy(mockEnemyData)
      adventure.setEnemy(enemy)
      expect(adventure.currentEnemy).toBe(enemy)
    })
  })

  describe('setPlayerAtack', () => {
    it('should set the player attack', () => {
      adventure.setPlayerAtack(mockSkill)
      expect(adventure.playerSelectedAttack).toBe(mockSkill)
    })
  })

  describe('clearEnemy', () => {
    it('should set currentEnemy and playerSelectedAttack to null', () => {
      const enemy = new AdventureEnemy(mockEnemyData)
      adventure.setEnemy(enemy)

      adventure.setPlayerAtack(mockSkill)

      adventure.clearEnemy()

      expect(adventure.currentEnemy).toBeNull()
      expect(adventure.playerSelectedAttack).toBeNull()
    })
  })
})
