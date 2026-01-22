import Decimal from 'break_infinity.js'

export type PlayerStats = {
  attack: Decimal
  defence: Decimal
  currentHP: Decimal
  maxHP: Decimal
  hpRegen: Decimal
}

export type PlayerResources = {
  gold: Decimal
  xp: Decimal
}

export class Player {
  private _stats: PlayerStats
  private _resources: PlayerResources

  constructor(stats: PlayerStats, resources: PlayerResources) {
    this._stats = stats
    this._resources = resources
  }

  get stats(): PlayerStats {
    return this._stats
  }

  get resources(): PlayerResources {
    return this._resources
  }

  regenerate(deltaTime: number): void {
    if (this._stats.currentHP.greaterThanOrEqualTo(this._stats.maxHP)) {
      return
    }

    const regenAmount = this._stats.hpRegen.multiply(deltaTime)
    const newHp = this._stats.currentHP.add(regenAmount)
    this._stats.currentHP = Decimal.min(newHp, this._stats.maxHP)
  }

  trainAttack(amount: Decimal, newLevel: Decimal, oldLevel: Decimal): void {
    const newLevelAttack = amount.times(Decimal.pow(newLevel, 1.3))
    const oldLevelAttack = amount.times(Decimal.pow(oldLevel, 1.3))
    const newAttack = this._stats.attack.plus(
      newLevelAttack.minus(oldLevelAttack)
    )
    this._stats.attack = newAttack
    this._stats.maxHP = newAttack.multiply(10)
  }

  trainDefence(amount: Decimal, newLevel: Decimal, oldLevel: Decimal): void {
    const newLevelDefence = amount.times(Decimal.pow(newLevel, 1.3))
    const oldLevelDefence = amount.times(Decimal.pow(oldLevel, 1.3))
    const newDefence = this._stats.defence.plus(
      newLevelDefence.minus(oldLevelDefence)
    )
    this._stats.defence = newDefence
    this._stats.hpRegen = newDefence.divide(20)
  }

  takeDamage(damage: Decimal, deltaTime: number = 1): boolean {
    const realDamage = damage.minus(this._stats.defence).multiply(deltaTime)

    if (realDamage.lessThanOrEqualTo(0)) return false

    const newHp = this._stats.currentHP.minus(realDamage)

    if (newHp.lessThanOrEqualTo(0)) {
      this._stats.currentHP = new Decimal(0)
      return true
    }

    this._stats.currentHP = newHp

    return false
  }

  spendGold(value: Decimal): boolean {
    if (value.greaterThan(this.resources.gold)) {
      return false
    }

    this.resources.gold = this.resources.gold.subtract(value)

    return true
  }

  increaseGold(value: Decimal): void {
    this.resources.gold = this.resources.gold.add(value)
  }

  spendXp(value: Decimal): boolean {
    if (!this.canSpendXpAmount(value)) {
      return false
    }

    this.resources.xp = this.resources.xp.subtract(value)

    return true
  }

  canSpendXpAmount(amount: Decimal) {
    if (amount.greaterThan(this.resources.xp)) {
      return false
    }

    return true
  }

  increaseXp(value: Decimal): void {
    this.resources.xp = this.resources.xp.add(value)
  }
}
