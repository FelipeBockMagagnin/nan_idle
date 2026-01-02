import { describe, it, expect, beforeEach, vi } from 'vitest'
import { setActivePinia, createPinia } from 'pinia'
import { useTrainingStore } from './trainingStore'
import { TrainingSkills } from '@/enums'
import Decimal from 'break_infinity.js'
import { usePlayerStore } from './playerStore'

describe('trainingStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    vi.clearAllMocks()
  })

  describe('actions', () => {
    describe('allocateTrainingEnergy', () => {
      it('should allocate energy to the specified skill', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        const value = new Decimal(10)

        store.allocateTrainingEnergy(skill, value)

        expect(store.training[skill].allocatedEnergy).toEqual(value)
      })

      it('should not affect other skills when allocating energy', () => {
        const store = useTrainingStore()
        const skillToAllocate = TrainingSkills.RegularAttack
        const otherSkill = TrainingSkills.BlockDefence
        const value = new Decimal(10)

        store.allocateTrainingEnergy(skillToAllocate, value)

        expect(store.training[otherSkill].allocatedEnergy).toEqual(
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

    describe('updateSkillsProgress', () => {
      it('should increase the progress of a skill with allocated energy', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        store.allocateTrainingEnergy(skill, new Decimal(1))

        store.updateSkillsProgress(1000)

        expect(store.training[skill].progress.toNumber()).toBeGreaterThan(0)
      })

      it('should not increase the progress of a skill with no allocated energy', () => {
        const store = useTrainingStore()

        store.updateSkillsProgress(1000)

        const skill = TrainingSkills.RegularAttack
        expect(store.training[skill].progress.toNumber()).toBe(0)
      })

      it('should level up the skill when progress reaches the difficulty', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        store.allocateTrainingEnergy(skill, new Decimal(100))
        store.training[skill].trainingDificulty = new Decimal(10)

        store.updateSkillsProgress(1000)

        expect(store.training[skill].level.toNumber()).toBeGreaterThan(1)
      })

      it('should increase the player stats when a skill levels up', () => {
        const playerStore = usePlayerStore()
        playerStore.stats.attack = new Decimal(1)

        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        store.allocateTrainingEnergy(skill, new Decimal(1))
        store.training[skill].progress = new Decimal(100)

        store.updateSkillsProgress(1)

        expect(playerStore.stats.attack.toNumber()).toBeGreaterThan(2)
      })

      it('should increase the player stats multiple times when a skill levels up by more than 1 level', () => {
        const playerStore = usePlayerStore()
        playerStore.stats.attack = new Decimal(1)

        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        store.allocateTrainingEnergy(skill, new Decimal(1))
        store.training[skill].progress = new Decimal(2000)

        store.updateSkillsProgress(1)

        expect(playerStore.stats.attack.toNumber()).toBeGreaterThan(10)
      })

      it('should increase the difficulty of a Skill when a skill levels up', () => {
        const store = useTrainingStore()
        const skill = TrainingSkills.RegularAttack
        store.allocateTrainingEnergy(skill, new Decimal(100))
        store.training[skill].trainingDificulty = new Decimal(10)
        const initialDifficulty = store.training[skill].trainingDificulty

        store.updateSkillsProgress(1000)

        expect(
          store.training[skill].trainingDificulty.toNumber()
        ).toBeGreaterThan(initialDifficulty.toNumber())
      })
    })
  })
})
