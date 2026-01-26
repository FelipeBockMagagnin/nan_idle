import { ItemSetEnum, ItemSlotEnum } from '../enums'
import { BaseItem, BaseItemOptions, ItemStats } from './BaseItem'

export type ItemOptions = BaseItemOptions & {
  slot: ItemSlotEnum
  initialStats: ItemStats
  itemSet?: ItemSetEnum
}

export class Item extends BaseItem {
  private _maxItemStats: ItemStats = {}
  private _currentItemStats: ItemStats = {}

  constructor(item: ItemOptions) {
    super(item)
    this._currentItemStats = item.initialStats ?? {}
    this._maxItemStats = item.initialStats ?? {}
    this.updateMaxItemStats()
  }

  get itemStats() {
    return this._currentItemStats
  }

  get slot() {
    return (this._item as ItemOptions).slot
  }

  updateMaxItemStats() {
    const item = this._item as ItemOptions

    if (!item.initialStats) return

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
}
