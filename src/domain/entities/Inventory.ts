import { ItemSlotEnum } from '../enums'
import { Item } from './Item'

export type ItemSlot = {
  item?: Item
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
  private _slots: ItemSlot[] = []
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
      slot: ItemSlotEnum.pants,
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

  addItem(item: Item) {
    const emptySlot = this._slots.findIndex((slot) => slot.item == null)

    if (emptySlot >= 0) {
      this._slots[emptySlot] = {
        item: item,
      }
    }
  }

  equipItem(itemSlotIndex: number, equippedSlotIndex: number) {
    const nextEquipedItem = this._slots[itemSlotIndex].item

    if (!nextEquipedItem) return

    const lastEquippedItem = this._equippedSlots[equippedSlotIndex].item

    console.log(lastEquippedItem, nextEquipedItem)

    this._equippedSlots[equippedSlotIndex].item = nextEquipedItem

    this._slots[itemSlotIndex].item = lastEquippedItem

    //todo calculate Item stats changes
  }
}
