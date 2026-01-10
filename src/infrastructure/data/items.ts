import { ItemSlotEnum } from '@/domain/enums'
import type { Item } from '@/domain/entities'

export const items: Item[] = [
  {
    id: 1,
    name: 'test',
    slot: ItemSlotEnum.boots,
    stats: {},
  },
]
