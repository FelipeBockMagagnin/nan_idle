import type { Skills } from '@/types'
import { TrainingSkills, SkillType } from '@/enums'
import Decimal from 'break_infinity.js'

export const getInitialSkills = (): Skills => ({
  [TrainingSkills.RegularAttack]: {
    allocatedEnergy: new Decimal(0),
    level: new Decimal(0),
    progress: new Decimal(0),
    trainingSpeed: new Decimal(1),
    trainingDificulty: new Decimal(10),
    trainingDificultyIncrease: new Decimal(1.2),
    skillType: SkillType.Attack,
    skillStatIncreaseValue: new Decimal(1),
  },
  [TrainingSkills.BlockDefence]: {
    allocatedEnergy: new Decimal(0),
    level: new Decimal(0),
    progress: new Decimal(0),
    trainingSpeed: new Decimal(1.2),
    trainingDificulty: new Decimal(10),
    trainingDificultyIncrease: new Decimal(1.2),
    skillType: SkillType.Defence,
    skillStatIncreaseValue: new Decimal(1),
  },
})