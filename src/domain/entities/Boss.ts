import Decimal from 'break_infinity.js'

export interface BossData {
  id: number
  name: string
  image: string
  stats: BossStats
}

export type BossStats = {
  hp: Decimal
  maxHp: Decimal
  attack: Decimal
  defence: Decimal
  hpRegen: Decimal
  xp: Decimal
}

export class Boss {
  constructor(private _data: BossData) {}

  get id() {
    return this._data.id
  }
  get name() {
    return this._data.name
  }
  get image() {
    return this._data.image
  }
  get stats() {
    return this._data.stats
  }

  regenerate(deltaTime: number): void {
    if (this.stats.hp.greaterThanOrEqualTo(this.stats.maxHp)) return

    const regen = this.stats.hpRegen.multiply(deltaTime)
    const newHp = this.stats.hp.add(regen)
    this.stats.hp = Decimal.min(newHp, this.stats.maxHp)
  }

  takeDamage(damage: Decimal, deltaTime: number = 1): boolean {
    const realDamage = damage.minus(this.stats.defence).multiply(deltaTime)

    if (realDamage.lessThanOrEqualTo(0)) return false

    const newHp = this.stats.hp.minus(realDamage)

    if (newHp.lessThanOrEqualTo(0)) {
      this.stats.hp = new Decimal(0)
      return true
    }

    this.stats.hp = newHp

    return false
  }
}
