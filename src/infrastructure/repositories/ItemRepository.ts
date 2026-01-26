import { IItemRepository } from '@/domain/interfaces/repositories/IItemRepository'
import { Item, ItemOptions } from '@/domain/entities/Item'
import { items } from '../data/items'
import { boosts } from '../data/boosts'
import { ItemTypeEnum } from '@/domain/enums'
import { Boost, BoostOptions } from '@/domain/entities/Boost'
import { AnyItem } from '@/domain/types'
import { BaseItemOptions } from '@/domain/entities/BaseItem'

export class ItemRepository implements IItemRepository {
  private boosts: BoostOptions[] = boosts
  private allItems: BaseItemOptions[] = [...items, ...boosts]

  getItem(id: number): AnyItem | null {
    const itemData = this.allItems.find((i) => i.id === id)

    if (!itemData) {
      return null
    }

    if (itemData.type === ItemTypeEnum.Equipment) {
      return new Item(itemData as ItemOptions)
    } else if (
      [
        ItemTypeEnum.PowerBoost,
        ItemTypeEnum.ToughnessBoost,
        ItemTypeEnum.SpecialBoost,
      ].includes(itemData.type)
    ) {
      return new Boost(itemData as BoostOptions)
    }

    return null
  }

  getRandomItemBoostByLevel(level: number): Boost | null {
    const boosts = this.boosts.filter((i) => i.boostLevel === level)

    const boostIndex = Math.floor(Math.random() * boosts.length)

    console.log(boostIndex)
    return new Boost(boosts[boostIndex] as BoostOptions)
  }
}
