import { BaseItem, BaseItemOptions } from './BaseItem'

export type BoostOptions = BaseItemOptions & {
  boostLevel: number
}

export class Boost extends BaseItem {
  constructor(item: BoostOptions) {
    super(item)
  }

  get boostLevel() {
    return (this._item as BoostOptions).boostLevel
  }
}
