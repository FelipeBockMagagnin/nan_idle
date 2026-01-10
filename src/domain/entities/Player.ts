import Decimal from 'break_infinity.js'

export type PlayerStats = {
  attack: Decimal
  defence: Decimal
  currentHP: Decimal
  maxHP: Decimal
  hpRegen: Decimal
}

export class Player {
  private _stats: PlayerStats

  constructor(stats: PlayerStats) {
    this._stats = stats
  }

  get stats(): PlayerStats {
    return this._stats
  }

  regenerate(deltaTime: number): void {
    if (this._stats.currentHP.greaterThan(this._stats.maxHP)) {
      this._stats.currentHP = this._stats.maxHP
    }

    const regenAmount = this._stats.hpRegen.multiply(deltaTime)
    const newHp = this._stats.currentHP.add(regenAmount)
    this._stats.currentHP = Decimal.min(newHp, this._stats.maxHP)
  }

  trainAttack(amount: Decimal): void {
    this._stats.attack = this._stats.attack.plus(amount)
  }

  trainDefence(amount: Decimal): void {
    this._stats.defence = this._stats.defence.plus(amount)
  }

  // Receives raw damage (before defence) - e.g. from a trap or single hit
  takeDamage(damage: Decimal): boolean {
    const realDamage = damage.minus(this._stats.defence)

    if (realDamage.lessThanOrEqualTo(0)) return false

    return this.applyDamage(realDamage)
  }

  // Receives net damage (after defence) - e.g. from DPS tick
  applyDamage(damage: Decimal): boolean {
    const newHp = this._stats.currentHP.minus(damage)

    if (newHp.lessThanOrEqualTo(0)) {
      this._stats.currentHP = new Decimal(0)
      return true
    }

    this._stats.currentHP = newHp
    return false
  }

  calculateDamage(targetDefence: Decimal): Decimal {
    const damage = this._stats.attack.minus(targetDefence)
    return Decimal.max(damage, 0)
  }
}
