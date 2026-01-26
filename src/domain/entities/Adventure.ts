import { Skill } from '@/domain/entities/Skill'
import { AdventureEnemy } from './AdventureEnemy'
import Decimal from 'break_infinity.js'

export type AdventureZone = {
  id: number
  name: string
  enemyIds: number[]
  bossDropChance: ItemDrop[]
  enemyDropChance: ItemDrop[]
  enemyGoldDrop?: Decimal
  bossGoldDrop?: Decimal
  xpDropChance?: Decimal
  boostDropChance?: BoostDrop
  boostLevel?: number
}

export type ItemDrop = {
  itemId: number
  chance: number
}

export type BoostDrop = {
  boostLevel: number
  chance: number
}

export class Adventure {
  private _currentEnemy: AdventureEnemy | null = null
  private _playerSelectedAttack: Skill | null = null
  private _adventureZone: AdventureZone | null = null

  constructor(adventureZone: AdventureZone | null) {
    this._adventureZone = adventureZone
  }

  get AdventureZone(): AdventureZone | null {
    return this._adventureZone
  }

  get zoneId(): number {
    if (!this._adventureZone?.id) return 0
    return this._adventureZone.id
  }

  get currentEnemy(): AdventureEnemy | null {
    return this._currentEnemy
  }

  get playerSelectedAttack(): Skill | null {
    return this._playerSelectedAttack
  }

  enterZone(adventureZone: AdventureZone | null): void {
    this._adventureZone = adventureZone
    this._currentEnemy = null
    this._playerSelectedAttack = null
  }

  getNextEnemyId(): number {
    if (!this._adventureZone) return 0
    return this._adventureZone.enemyIds[
      Math.floor(Math.random() * this._adventureZone.enemyIds.length)
    ]
  }

  setEnemy(enemy: AdventureEnemy): void {
    this._currentEnemy = enemy
  }

  setPlayerAtack(skill: Skill | null): void {
    this._playerSelectedAttack = skill
  }

  clearEnemy(): void {
    this._currentEnemy = null
    this._playerSelectedAttack = null
  }

  getDroppedBoostLevel(dropBonus: Decimal): number | null {
    if (!this._adventureZone || !this._adventureZone.boostDropChance)
      return null

    const dropChance = this._adventureZone.boostDropChance.chance
    const currentDropChance = dropBonus.mul(dropChance)

    const roll = new Decimal(Math.random() * 100)

    if (roll.lessThan(currentDropChance)) {
      return this._adventureZone.boostDropChance.boostLevel
    }

    return null
  }

  getItemsDroppedIds(dropBonus: Decimal): number[] {
    const itemsDropped: number[] = []

    if (!this._adventureZone) return []

    console.log(this.currentEnemy?.isBoss)
    if (this.currentEnemy?.isBoss) {
      itemsDropped.push(
        this.getSingleDrop(this._adventureZone.bossDropChance, dropBonus)
      )
    } else {
      itemsDropped.push(
        this.getSingleDrop(this._adventureZone.enemyDropChance, dropBonus)
      )
    }

    return itemsDropped
  }

  getSingleDrop(dropList: ItemDrop[], dropBonus: Decimal): number {
    const sortedDrops = dropList.sort((a, b) => a.chance - b.chance)

    for (const item of sortedDrops) {
      const effectiveChance = Math.min(
        dropBonus.multiply(item.chance).toNumber(),
        100
      )

      const roll = Math.random() * 100

      if (roll < effectiveChance) {
        return item.itemId
      }
    }

    return 0
  }
}
