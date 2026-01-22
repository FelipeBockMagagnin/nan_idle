import Decimal from 'break_infinity.js'
import { SkillType, TrainingSkillsEnum } from '@/domain/enums'

export type SkillOptions = {
  id: TrainingSkillsEnum
  skillType: SkillType
  name: string
  level: Decimal
  progress: Decimal
  allocatedEnergy: Decimal
  baseEnergyCost: Decimal
  baseStatsPerLevel: Decimal
  unlocksSkill: TrainingSkillsEnum | null
  combatMultiplier: number
  currentAttackCooldown: number
  attackCooldown: number
  unlocked: boolean
}

export class Skill {
  id: TrainingSkillsEnum
  skillType: SkillType
  name: string
  level: Decimal
  progress: Decimal
  allocatedEnergy: Decimal
  baseEnergyCost: Decimal
  baseStatsPerLevel: Decimal
  unlocksSkill: TrainingSkillsEnum | null
  combatMultiplier: number
  currentAttackCooldown: number
  attackCooldown: number
  unlocked: boolean

  constructor(options: SkillOptions) {
    this.id = options.id
    this.skillType = options.skillType
    this.name = options.name
    this.level = options.level
    this.progress = options.progress
    this.allocatedEnergy = options.allocatedEnergy
    this.baseEnergyCost = options.baseEnergyCost
    this.baseStatsPerLevel = options.baseStatsPerLevel
    this.unlocksSkill = options.unlocksSkill
    this.combatMultiplier = options.combatMultiplier
    this.currentAttackCooldown = options.currentAttackCooldown
    this.attackCooldown = options.attackCooldown
    this.unlocked = options.unlocked
  }

  get skill(): Skill {
    return this
  }

  /**
   * Ticks the skill.
   * @returns level gained in this tick.
   */
  tick(deltaTime: number): boolean {
    this.decreaseAttackCooldown(deltaTime)

    if (this.allocatedEnergy.lte(0)) return false

    const increase = this.allocatedEnergy.times(deltaTime)
    this.progress = this.progress.add(increase)

    if (this.progress.gte(this.baseEnergyCost)) {
      this.level = this.level.add(1)
      this.progress = new Decimal(0)
      return true
    }

    return false
  }

  attackOnCooldown() {
    return this.currentAttackCooldown > 0
  }

  resetAttackCooldown() {
    return (this.currentAttackCooldown = this.attackCooldown)
  }

  decreaseAttackCooldown(deltaTime: number) {
    const newAttackCooldown = this.currentAttackCooldown - deltaTime
    this.currentAttackCooldown = Math.max(newAttackCooldown, 0)
  }

  allocateEnergy(amount: Decimal): boolean {
    const newAmount = this.allocatedEnergy.add(amount)
    if (newAmount.greaterThanOrEqualTo(0)) {
      this.allocatedEnergy = newAmount
      return true
    }

    return false
  }

  reclaimEnergy(amount: Decimal): boolean {
    const newAmount = this.allocatedEnergy.subtract(amount)
    if (newAmount.greaterThanOrEqualTo(0)) {
      this.allocatedEnergy = newAmount
      return true
    }

    return false
  }

  getskillProgressPercent(): number {
    return this.progress.multiply(100).divide(this.baseEnergyCost).toNumber()
  }

  getPlayerAttackCooldown(): string {
    return this.currentAttackCooldown.toFixed(1) || ''
  }

  setUnlocked(value: boolean): void {
    this.unlocked = value
  }
}
