import Decimal from 'break_infinity.js'
import { SkillType, TrainingSkillsEnum } from '@/domain/enums'

export class Skill {
  constructor(
    public id: TrainingSkillsEnum,
    public skillType: SkillType,
    public level: Decimal,
    public progress: Decimal,
    public allocatedEnergy: Decimal,
    public baseEnergyCost: Decimal,
    public baseStatsPerLevel: Decimal,
    public unlockThreshold: Decimal,
    public trainingSpeed: Decimal,
    public combatMultiplier: number,
    public currentAttackCooldown: number,
    public attackCooldown: number
  ) {}

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
}
