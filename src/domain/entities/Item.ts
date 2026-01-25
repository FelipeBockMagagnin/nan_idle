import Decimal from 'break_infinity.js'
import { ItemSlotEnum, ItemTypeEnum } from '../enums'

export type ItemOptions = {
  id: number
  slot: ItemSlotEnum
  type: ItemTypeEnum
  level: number
  name: string
  initialStats: ItemStats
  boost?: Decimal
}

type ItemStats = {
  toughness?: Decimal
  power?: Decimal
  maxHp?: Decimal
}

export class Item {
  private _item: ItemOptions
  private _maxItemStats: ItemStats
  private _currentItemStats: ItemStats

  constructor(item: ItemOptions) {
    this._item = item
    this._currentItemStats = item.initialStats
    this._maxItemStats = item.initialStats
    this.updateMaxItemStats()
  }

  get name() {
    return this._item.name
  }

  get itemStats() {
    return this._currentItemStats
  }

  get boostValue() {
    return this._item.boost
  }

  get itemType() {
    return this._item.type
  }

  updateMaxItemStats() {
    const item = this._item
    if (item.level > 1) {
      this._maxItemStats.maxHp = item.initialStats.maxHp?.times(
        item.level * 0.01
      )

      this._maxItemStats.power = item.initialStats.power?.times(
        item.level * 0.01
      )

      this._maxItemStats.toughness = item.initialStats.toughness?.times(
        item.level * 0.01
      )
    }
  }

  increaseItemLevel(amount: number) {
    this._item.level += amount
    this.updateMaxItemStats()
  }

  // applyBoost(boost: Item) {
  //   switch (boost.itemType) {
  //     case ItemTypeEnum.PowerBoost:

  //   }
  // }
}
