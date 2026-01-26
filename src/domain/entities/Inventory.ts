import { AnyItem } from '../types'
import { ItemSlotEnum } from '../enums'
import { Item } from './Item'

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

export class Inventory {
  public maxInventorySize: number
  private _slots: AnyItemSlot[] = []
  private _equippedSlots: EquippedItemSlot[] = []

  constructor(inventory: InventoryOptions) {
    this.maxInventorySize = inventory.maxInventorySize

    for (let i: number = 0; i < inventory.maxInventorySize; i++) {
      this._slots[i] = {}
    }

    this._equippedSlots.push({
      id: 0,
      slot: ItemSlotEnum.head,
    })

    this._equippedSlots.push({
      id: 1,
      slot: ItemSlotEnum.chest,
    })

    this._equippedSlots.push({
      id: 2,
      slot: ItemSlotEnum.legs,
    })

    this._equippedSlots.push({
      id: 3,
      slot: ItemSlotEnum.boots,
    })

    this._equippedSlots.push({
      id: 4,
      slot: ItemSlotEnum.weapon,
    })

    this._equippedSlots.push({
      id: 5,
      slot: ItemSlotEnum.accessory,
    })

    this._equippedSlots.push({
      id: 6,
      slot: ItemSlotEnum.accessory,
    })
  }

  get slots() {
    return this._slots
  }

  get equippedSlots() {
    return this._equippedSlots
  }

  addItem(item: AnyItem) {
    const emptySlot = this._slots.findIndex((slot) => slot.item == null)

    if (emptySlot >= 0) {
      this._slots[emptySlot] = {
        item: item,
      }
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
  }
}
