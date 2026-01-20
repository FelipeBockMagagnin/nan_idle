import { Skill } from './Skill'
import { SkillType, TrainingSkillsEnum } from '@/domain/enums'
import Decimal from 'break_infinity.js'

describe('Skill', () => {
  let skill: Skill

  beforeEach(() => {
    skill = new Skill({
      id: TrainingSkillsEnum.RegularAttack,
      skillType: SkillType.Attack,
      level: new Decimal(1),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(10),
      baseEnergyCost: new Decimal(100),
      baseStatsPerLevel: new Decimal(1),
      unlockThreshold: new Decimal(0),
      trainingSpeed: new Decimal(1),
      combatMultiplier: 1,
      currentAttackCooldown: 0,
      attackCooldown: 2,
    })
  })

  it('should create a skill with the correct properties', () => {
    expect(skill.id).toBe(TrainingSkillsEnum.RegularAttack)
    expect(skill.skillType).toBe(SkillType.Attack)
    expect(skill.level).toEqual(new Decimal(1))
    expect(skill.progress).toEqual(new Decimal(0))
    expect(skill.allocatedEnergy).toEqual(new Decimal(10))
    expect(skill.baseEnergyCost).toEqual(new Decimal(100))
  })

  describe('getSkill', () => {
    it('should return the skill instance', () => {
      expect(skill.skill).toBe(skill)
    })
  })

  describe('tick', () => {
    it('should increase progress when energy is allocated', () => {
      skill.tick(1)
      expect(skill.progress).toEqual(new Decimal(10))
    })

    it('should not increase progress when no energy is allocated', () => {
      skill.allocatedEnergy = new Decimal(0)
      skill.tick(1)
      expect(skill.progress).toEqual(new Decimal(0))
    })

    it('should increase level when progress reaches baseEnergyCost', () => {
      skill.tick(10)
      expect(skill.level).toEqual(new Decimal(2))
      expect(skill.progress).toEqual(new Decimal(0))
    })

    it('should return true when a level is gained', () => {
      const levelGained = skill.tick(10)
      expect(levelGained).toBe(true)
    })

    it('should return false when a level is not gained', () => {
      const levelGained = skill.tick(1)
      expect(levelGained).toBe(false)
    })

    it('should decrease attack cooldown', () => {
        skill.currentAttackCooldown = 2
        skill.tick(1)
        expect(skill.currentAttackCooldown).toBe(1)
    })
  })

  describe('attackOnCooldown', () => {
    it('should return true if currentAttackCooldown is greater than 0', () => {
      skill.currentAttackCooldown = 1
      expect(skill.attackOnCooldown()).toBe(true)
    })

    it('should return false if currentAttackCooldown is 0', () => {
      skill.currentAttackCooldown = 0
      expect(skill.attackOnCooldown()).toBe(false)
    })
  })

    describe('resetAttackCooldown', () => {
        it('should reset the current attack cooldown to the attack cooldown', () => {
            skill.currentAttackCooldown = 0
            skill.resetAttackCooldown()
            expect(skill.currentAttackCooldown).toBe(2)
        })
    })

    describe('decreaseAttackCooldown', () => {
        it('should decrease the current attack cooldown', () => {
            skill.currentAttackCooldown = 2
            skill.decreaseAttackCooldown(1)
            expect(skill.currentAttackCooldown).toBe(1)
        })

        it('should not decrease the current attack cooldown below 0', () => {
            skill.currentAttackCooldown = 1
            skill.decreaseAttackCooldown(2)
            expect(skill.currentAttackCooldown).toBe(0)
        })
    })

    describe('allocateEnergy', () => {
        it('should increase allocated energy', () => {
            skill.allocateEnergy(new Decimal(5))
            expect(skill.allocatedEnergy).toEqual(new Decimal(15))
        })

        it('should return true on success', () => {
            const result = skill.allocateEnergy(new Decimal(5))
            expect(result).toBe(true)
        })

        it('should not allocate negative energy', () => {
            skill.allocateEnergy(new Decimal(-15))
            expect(skill.allocatedEnergy).toEqual(new Decimal(10))
        })

        it('should return false on failure', () => {
            const result = skill.allocateEnergy(new Decimal(-15))
            expect(result).toBe(false)
        })
    })

    describe('reclaimEnergy', () => {
        it('should decrease allocated energy', () => {
            skill.reclaimEnergy(new Decimal(5))
            expect(skill.allocatedEnergy).toEqual(new Decimal(5))
        })

        it('should return true on success', () => {
            const result = skill.reclaimEnergy(new Decimal(5))
            expect(result).toBe(true)
        })

        it('should not reclaim more energy than allocated', () => {
            skill.reclaimEnergy(new Decimal(15))
            expect(skill.allocatedEnergy).toEqual(new Decimal(10))
        })
        
        it('should return false on failure', () => {
            const result = skill.reclaimEnergy(new Decimal(15))
            expect(result).toBe(false)
        })
    })
})
