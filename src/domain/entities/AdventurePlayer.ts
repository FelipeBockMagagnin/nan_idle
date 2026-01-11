import Decimal from 'break_infinity.js'

export type PlayerAdventureStats = {
  power: Decimal
  toughness: Decimal
  currentHP: Decimal
  maxHP: Decimal
  hpRegen: Decimal
}

export class AdventurePlayer {
  private _stats: PlayerAdventureStats

  constructor(stats: PlayerAdventureStats) {
    this._stats = stats
  }

  get stats(): PlayerAdventureStats {
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

  trainPower(amount: Decimal): void {
    this._stats.power = this._stats.power.plus(amount)
  }

  trainToughness(amount: Decimal): void {
    this._stats.toughness = this._stats.toughness.plus(amount)
  }

  takeDamage(damage: Decimal): boolean {
    //Damage formular = damage - (thoughness / 2)
    const realDamage = damage.minus(this._stats.toughness.divide(2))

    if (realDamage.lessThanOrEqualTo(0)) return false

    const newHp = this._stats.currentHP.minus(realDamage)

    if (newHp.lessThanOrEqualTo(0)) {
      this._stats.currentHP = new Decimal(0)
      return true
    }

    this._stats.currentHP = newHp

    return false
  }
}
