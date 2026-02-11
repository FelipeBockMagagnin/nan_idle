import Decimal from 'break_infinity.js'

export interface AdventureEnemyData {
  id: number
  name: string
  image: string
  background: string
  stats: AdventureEnemyStats
  isBoss: boolean
}

export type AdventureEnemyStats = {
  hp: Decimal
  maxHp: Decimal
  power: Decimal
  toughness: Decimal
  hpRegen: Decimal
  respawnTime: number
  attackCooldown: number
}

export class AdventureEnemy {
  constructor(private _data: AdventureEnemyData) {
    this.currentAttackCooldown = _data.stats.attackCooldown
  }

  currentAttackCooldown: number

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
  get isBoss() {
    return this._data.isBoss
  }
  get background() {
    return this._data.background
  }

  regenerate(deltaTime: number): void {
    if (this.stats.hp.greaterThanOrEqualTo(this.stats.maxHp)) return

    const regen = this.stats.hpRegen.multiply(deltaTime)
    const newHp = this.stats.hp.add(regen)
    this.stats.hp = Decimal.min(newHp, this.stats.maxHp)
  }

  takeDamage(damage: Decimal): boolean {
    //Damage formular = damage - (thoughness / 2)
    const realDamage = damage.minus(this.stats.toughness.divide(2))

    if (realDamage.lessThanOrEqualTo(0)) return false

    const newHp = this.stats.hp.minus(realDamage)

    if (newHp.lessThanOrEqualTo(0)) {
      this.stats.hp = new Decimal(0)
      return true
    }

    this.stats.hp = newHp

    return false
  }

  attackOnCooldown(): boolean {
    return this.currentAttackCooldown > 0
  }

  resetAttackCooldown(): void {
    this.currentAttackCooldown = this.stats.attackCooldown
  }

  decreaseAttackCooldown(deltaTime: number): void {
    if (this.currentAttackCooldown <= 0) return
    const newAttackCooldown = this.currentAttackCooldown - deltaTime
    this.currentAttackCooldown = Math.max(newAttackCooldown, 0)
  }

  getAttackCooldownPercent(): number {
    return (this.currentAttackCooldown * 100) / this.stats.attackCooldown
  }

  decreaseRespawnTime(deltaTime: number): void {
    if (this.stats.respawnTime <= 0) return

    const newRespawnTime = this.stats.respawnTime - deltaTime
    this.stats.respawnTime = Math.max(newRespawnTime, 0)
  }
}
