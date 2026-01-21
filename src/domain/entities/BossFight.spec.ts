import { describe, it, expect, beforeEach } from 'vitest'
import { BossFight } from './BossFight'
import { Boss } from './Boss'
import Decimal from 'break_infinity.js'

describe('Boss Fight Entity', () => {
  let bossFight: BossFight

  const bossMock = new Boss({
    id: 1,
    name: 'test',
    image: 'test',
    stats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(10),
      hpRegen: new Decimal(1),
      maxHp: new Decimal(1),
      xp: new Decimal(1),
    },
  })

  beforeEach(() => {
    bossFight = new BossFight()
  })

  describe('setBoss', () => {
    it('should change the current boss to the new one', () => {
      bossFight.setBoss(bossMock)
      expect(bossFight.boss).toBe(bossMock)
    })
  })

  describe('isFighting', () => {
    it('should return current fighting state', () => {
      bossFight.changeFightingState(true)
      expect(bossFight.isFighting()).toBe(true)
    })
  })

  describe('changeFightingState', () => {
    it('should change the fighting state', () => {
      bossFight.changeFightingState(false)
      expect(bossFight.isFighting()).toBe(false)
    })
  })
})
