import { ItemOptions } from '@/domain/entities/Item'
import { ItemSlotEnum, ItemTypeEnum } from '@/domain/enums'
import Decimal from 'break_infinity.js'

export const items: ItemOptions[] = [
  {
    id: 1,
    name: 'Cloth Hat',
    image: '/assets/items/item_1.png',
    slot: ItemSlotEnum.head,
    initialStats: {
      toughness: new Decimal(1),
      hpRegen: new Decimal(0.03),
    },
    level: 10,
    type: ItemTypeEnum.Equipment,
  },
  {
    id: 2,
    name: 'Cloth Shirt',
    image: '/assets/items/item_2.png',
    slot: ItemSlotEnum.chest,
    initialStats: {
      toughness: new Decimal(1),
      hpRegen: new Decimal(0.03),
    },
    level: 10,
    type: ItemTypeEnum.Equipment,
  },
  {
    id: 3,
    name: 'Cloth Leggings',
    image: '/assets/items/item_3.png',
    slot: ItemSlotEnum.legs,
    initialStats: {
      toughness: new Decimal(1),
      hpRegen: new Decimal(0.03),
    },
    level: 10,
    type: ItemTypeEnum.Equipment,
  },
  {
    id: 4,
    name: 'Cloth Boots',
    image: '/assets/items/item_4.png',
    slot: ItemSlotEnum.boots,
    initialStats: {
      toughness: new Decimal(1),
      hpRegen: new Decimal(0.03),
    },
    level: 10,
    type: ItemTypeEnum.Equipment,
  },
  {
    id: 5,
    name: 'A Stick',
    image: '/assets/items/item_5.png',
    slot: ItemSlotEnum.weapon,
    initialStats: {
      power: new Decimal(3),
      maxHp: new Decimal(9),
    },
    level: 10,
    type: ItemTypeEnum.Equipment,
  },
]
