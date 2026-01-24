import { Skill } from '@/domain/entities/Skill'
import { AdventureEnemy } from './AdventureEnemy'
import Decimal from 'break_infinity.js'

export type AdventureZone = {
  id: number
  name: string
  enemyIds: number[]
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

  getItemsDroppedIds(dropBonus: Decimal): number[] {
    const itemsDropped: number[] = []
    this._currentEnemy?.stats.itemsDrop.forEach((item) => {
      //todo calculate change
      console.log(dropBonus) //TODO calculate dropBonus and dropChance
      itemsDropped.push(item.itemId)
    })

    return itemsDropped
  }
}
