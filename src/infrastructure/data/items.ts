import { ItemOptions } from '@/domain/entities/Item'
import { ItemSlotEnum, ItemTypeEnum } from '@/domain/enums'
import Decimal from 'break_infinity.js'

export const items: ItemOptions[] = [
  {
    id: 1,
    name: 'test',
    slot: ItemSlotEnum.boots,
    equipped: false,
    initialStats: {
      maxHp: new Decimal(1),
      power: new Decimal(1),
      toughness: new Decimal(1),
    },
    level: 1,
    position: null,
    type: ItemTypeEnum.Equipment,
  },
]
