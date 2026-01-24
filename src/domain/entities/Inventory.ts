import { Item } from './Item'

export type InventoryOptions = {
  items: Item[]
  slots: number
}

export class Inventory {
  private _inventory: InventoryOptions

  constructor(inventory: InventoryOptions) {
    this._inventory = inventory
  }

  addItem(item: Item) {
    this._inventory.items.push(item)
  }
}
