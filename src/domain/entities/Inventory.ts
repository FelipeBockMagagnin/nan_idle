import { AnyItem } from '../types'
import { ItemSlotEnum } from '../enums'
import { Item } from './Item'
import { ItemStats } from './BaseItem'
import Decimal from 'break_infinity.js'

export type AnyItemSlot = {
  item?: AnyItem
}

export type EquippedItemSlot = {
  id: number
  slot: ItemSlotEnum
  item?: Item
}

export type InventoryOptions = {
  maxInventorySize: number
}

export type PendingStatChange = {
  stats: ItemStats
  incremental: boolean
}

export class Inventory {
  public maxInventorySize: number
  private _slots: AnyItemSlot[] = []
  private _equippedSlots: EquippedItemSlot[] = []
  private _totalStats: ItemStats = {}

  constructor(inventory: InventoryOptions) {
    this.maxInventorySize = inventory.maxInventorySize

    for (let i: number = 0; i < inventory.maxInventorySize; i++) {
      this._slots[i] = {}
    }

    const defaultSlots = [
      ItemSlotEnum.head,
      ItemSlotEnum.chest,
      ItemSlotEnum.legs,
      ItemSlotEnum.boots,
      ItemSlotEnum.weapon,
      ItemSlotEnum.accessory,
      ItemSlotEnum.accessory,
    ]

    defaultSlots.forEach((slotType, index) => {
      this._equippedSlots.push({ id: index, slot: slotType })
    })
  }

  get slots() {
    return this._slots
  }

  get equippedSlots() {
    return this._equippedSlots
  }

  getAllEquippedItemsStats(): ItemStats {
    return this._totalStats
  }

  calculateAllEquippedItemsStats(): void {
    const totalStats = {
      hpRegen: new Decimal(0),
      maxHp: new Decimal(0),
      power: new Decimal(0),
      toughness: new Decimal(0),
    } as ItemStats

    this._equippedSlots.forEach((item) => {
      if (!item.item) {
        return
      }
      const stats = item.item.itemStats

      if (stats.hpRegen) {
        totalStats.hpRegen = totalStats.hpRegen?.plus(stats.hpRegen)
      }
      if (stats.maxHp) {
        totalStats.maxHp = totalStats.maxHp?.plus(stats.maxHp)
      }
      if (stats.power) {
        totalStats.power = totalStats.power?.plus(stats.power)
      }
      if (stats.toughness) {
        totalStats.toughness = totalStats.toughness?.plus(stats.toughness)
      }
    })

    this._totalStats = totalStats
  }

  addItem(item: AnyItem) {
    const emptySlot = this._slots.findIndex((slot) => slot.item == null)

    if (emptySlot >= 0) {
      this._slots[emptySlot] = {
        item: item,
      }
      this.calculateAllEquippedItemsStats()
    }
  }

  getEquippedItem(index: number) {
    return this._equippedSlots[index].item
  }

  getInventoryItem(index: number) {
    return this._slots[index].item
  }

  equipItem(
    sourceIndex: number,
    targetIndex: number,
    isSourceEquipped: boolean,
    isTargetEquipped: boolean
  ) {
    const sourceSlot = isSourceEquipped
      ? this._equippedSlots[sourceIndex]
      : this._slots[sourceIndex]
    const targetSlot = isTargetEquipped
      ? this._equippedSlots[targetIndex]
      : this._slots[targetIndex]

    const sourceItem = sourceSlot.item
    const targetItem = targetSlot.item

    if (!(sourceItem instanceof Item)) {
      // TODO implement Boosters
      this.calculateAllEquippedItemsStats()
      return
    }

    // Check for equip compability with slot
    if (isTargetEquipped) {
      const equippedTargetSlot = this._equippedSlots[targetIndex]
      if (sourceItem.slot !== equippedTargetSlot.slot) {
        if (
          sourceItem.slot !== ItemSlotEnum.accessory ||
          equippedTargetSlot.slot !== ItemSlotEnum.accessory
        ) {
          console.log('invalid 1')
          return
        }
      }
    }

    // Check for equip compability with slot
    if (isSourceEquipped && targetItem && targetItem instanceof Item) {
      const equippedSourceSlot = this._equippedSlots[sourceIndex]
      if (targetItem.slot !== equippedSourceSlot.slot) {
        if (
          targetItem.slot !== ItemSlotEnum.accessory ||
          equippedSourceSlot.slot !== ItemSlotEnum.accessory
        ) {
          console.log('invalid 2')
          return
        }
      }
    }

    // Level up if same item
    if (
      targetItem &&
      targetItem instanceof Item &&
      sourceItem.id === targetItem.id
    ) {
      targetItem.increaseItemLevel(sourceItem.level)
      console.log('level up')
      sourceSlot.item = undefined
      return
    }

    // Swap the items
    sourceSlot.item = targetItem
    targetSlot.item = sourceItem
    console.log('swap item')
    this.calculateAllEquippedItemsStats()
  }
}
