import { ItemSlotEnum, SkillType } from '@/enums'
import Decimal from 'break_infinity.js'

// Player-related types
export type PlayerStats = {
  attack: Decimal
  defence: Decimal
  currentHP: Decimal
  maxHP: Decimal
  hpRegen: Decimal
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
export interface Combatant {
  id: number
  name: string
  image: string
}

export type EnemyStats = {
  hp: Decimal
  maxHp: Decimal
  attack: Decimal
  defence: Decimal
  hpRegen: Decimal
}

export interface Enemy extends Combatant {
  stats: EnemyStats
  goldDrop: Decimal
  itemsDrop: ItemDrop[]
}

// Boss types
export interface BossStats extends EnemyStats {
  xp: Decimal
}

export interface Boss extends Combatant {
  stats: BossStats
}

//Adventure Zone
export type AdventureZone = {
  id: number
  name: string
  enemyIds: number[]
}

export type ItemDrop = {
  itemId: number
  chance: number
}

export type Item = {
  id: number
  slot: ItemSlotEnum
  name: string
  stats: any // eslint-disable-line @typescript-eslint/no-explicit-any
}

//Skils types
export type Skills = Record<string, Skill>

export type Skill = {
  allocatedEnergy: Decimal
  level: Decimal
  trainingSpeed: Decimal
  progress: Decimal
  trainingDificulty: Decimal
  trainingDificultyIncrease: Decimal
  skillType: SkillType
  skillStatIncreaseValue: Decimal
}
