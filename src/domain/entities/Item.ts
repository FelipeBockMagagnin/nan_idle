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
    this._currentItemStats = { ...item.initialStats }
    this._maxItemStats = { ...item.initialStats }
    this.updateMaxItemStats()
  }

  get itemStats() {
    return this._currentItemStats
  }

  get maxItemStats() {
    return this._maxItemStats
  }

  get slot() {
    return (this._item as ItemOptions).slot
  }

  updateMaxItemStats() {
    const item = this._item as ItemOptions

    if (!item.initialStats) return

    if (item.level > 1) {
      this._maxItemStats.maxHp = item.initialStats.maxHp
        ?.add(item.initialStats.maxHp.multiply(item.level * 0.01))
        .floor()

      this._maxItemStats.power = item.initialStats.power
        ?.add(item.initialStats.power.multiply(item.level * 0.01))
        .floor()

      this._maxItemStats.toughness = item.initialStats.toughness
        ?.add(item.initialStats.toughness.multiply(item.level * 0.01))
        .floor()
    }
  }

  increaseItemLevel(amount: number) {
    this._item.level += amount
    this.updateMaxItemStats()
  }
}
