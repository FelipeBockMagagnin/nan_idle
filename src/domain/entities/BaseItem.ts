import { ItemTypeEnum } from '../enums'
import Decimal from 'break_infinity.js'

export type ItemStats = {
  toughness?: Decimal
  power?: Decimal
  maxHp?: Decimal
  hpRegen?: Decimal
}

export type BaseItemOptions = {
  id: number
  type: ItemTypeEnum
  image: string
  level: number
  name: string
}

export class BaseItem {
  protected _item: BaseItemOptions

  constructor(item: BaseItemOptions) {
    this._item = item
  }

  get id() {
    return this._item.id
  }

  get name() {
    return this._item.name
  }

  get image() {
    return this._item.image
  }

  get level() {
    return this._item.level
  }

  get itemType() {
    return this._item.type
  }
}
