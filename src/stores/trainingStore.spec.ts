import { describe, it, expect, beforeEach } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrainingStore } from './trainingStore'
import { TrainingSkills } from '@/enums'
import Decimal from 'break_infinity.js'

describe('trainingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  describe('initial state', () => {
    it('should initialize training skills with default values', () => {
      const store = useTrainingStore()
      const skillCount = Object.keys(TrainingSkills).length
      expect(Object.keys(store.training).length).toBe(skillCount)

      for (const skill in TrainingSkills) {
        expect(store.training[skill]).toEqual({
          allocatedEnergy: new Decimal(0),
          level: new Decimal(0),
          progress: new Decimal(0),
          trainingSpeed: new Decimal(1),
        })
      }
    })
  })

  describe('actions', () => {
    describe('allocateTrainingEnergy', () => {
      it('should allocate energy to the specified skill', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        const value = new Decimal(10)

        store.allocateTrainingEnergy(skill, value)

        const skillName = TrainingSkills[skill]
        expect(store.training[skillName].allocatedEnergy).toEqual(value)
      })

      it('should not affect other skills when allocating energy', () => {
        const store = useTrainingStore()
        const skillToAllocate = TrainingSkills.RegularAttack
        const otherSkill = TrainingSkills.BlockDefence
        const value = new Decimal(10)

        store.allocateTrainingEnergy(skillToAllocate, value)

        const otherSkillName = TrainingSkills[otherSkill]
        expect(store.training[otherSkillName].allocatedEnergy).toEqual(
          new Decimal(0)
        )
      })

      it('should not allow to decrease allocated energy to negative value', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack

        store.allocateTrainingEnergy(skill, new Decimal(1))

        const allocatedReturn = store.allocateTrainingEnergy(
          skill,
          new Decimal(-2)
        )
        expect(allocatedReturn).toStrictEqual(false)
      })
    })
  })
})
