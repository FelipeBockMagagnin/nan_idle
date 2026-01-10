import Decimal from 'break_infinity.js'
import { ItemDrop } from '.'

export interface IEnemyData {
  id: number
  name: string
  image: string
  bossStats: EnemyBossStats
  adventureStats: EnemyAdventureStats
}

export type EnemyBossStats = {
  hp: Decimal
  maxHp: Decimal
  attack: Decimal
  defence: Decimal
  hpRegen: Decimal
  xp: Decimal
}

export type EnemyAdventureStats = {
  hp: Decimal
  maxHp: Decimal
  power: Decimal
  toughness: Decimal
  hpRegen: Decimal
  goldDrop: Decimal
  itemsDrop: ItemDrop[]
}

export class Enemy {
  constructor(private _data: IEnemyData) {}

  get id() { return this._data.id }
  get name() { return this._data.name }
  get image() { return this._data.image }
  get bossStats() { return this._data.bossStats }
  get adventureStats() { return this._data.adventureStats }

  regenerateBossHP(deltaTime: number): void {
    if (this.bossStats.hp.greaterThanOrEqualTo(this.bossStats.maxHp)) return

    const regen = this.bossStats.hpRegen.multiply(deltaTime)
    const newHp = this.bossStats.hp.add(regen)
    this.bossStats.hp = Decimal.min(newHp, this.bossStats.maxHp)
  }

  calculateBossDamage(targetDefence: Decimal): Decimal {
    const damage = this.bossStats.attack.minus(targetDefence)
    return Decimal.max(damage, 0)
  }

  applyBossDamage(amount: Decimal): void {
    const newHp = this.bossStats.hp.minus(amount)
    this.bossStats.hp = Decimal.max(newHp, 0)
  }

  regenerateAdventureHP(deltaTime: number): void {
    if (this.adventureStats.hp.greaterThanOrEqualTo(this.adventureStats.maxHp))
      return

    const regen = this.adventureStats.hpRegen.multiply(deltaTime)
    const newHp = this.adventureStats.hp.add(regen)
    this.adventureStats.hp = Decimal.min(newHp, this.adventureStats.maxHp)
  }

  calculateAdventureDamage(targetDefence: Decimal): Decimal {
    const damage = this.adventureStats.power.minus(targetDefence)
    return Decimal.max(damage, 0)
  }

  takeAdventureDamage(damage: Decimal): void {
    const realDamage = Decimal.max(damage.minus(this.adventureStats.toughness), 0)
    this.applyAdventureDamage(realDamage)
  }

  applyAdventureDamage(amount: Decimal): void {
    const newHp = this.adventureStats.hp.minus(amount)
    this.adventureStats.hp = Decimal.max(newHp, 0)
  }
}
