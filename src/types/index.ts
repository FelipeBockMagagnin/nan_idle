import { SkillType } from '@/enums'
import Decimal from 'break_infinity.js'

// Player-related types
export type PlayerStats = {
  attack: Decimal
  defence: Decimal
}

// Energy store types
export type Energy = {
  current: Decimal
  allocated: Decimal
  max: Decimal
}

// HP-related types
export type HP = {
  current: Decimal
  max: Decimal
}

// Enemy types
export type Enemy = {
  hp: HP
}

//Training types
export type Training = Record<string, TrainingTrait>

export type TrainingTrait = {
  allocatedEnergy: Decimal
  level: Decimal
  trainingSpeed: Decimal
  progress: Decimal
  trainingDificulty: Decimal
  trainingDificultyIncrease: Decimal
  skillType: SkillType
  skillStatIncreaseValue: Decimal
}
