import type { Enemy } from '@/types'
import Decimal from 'break_infinity.js'

export const enemies: Enemy[] = [
  {
    id: 1,
    name: 'Tieppo Emo',
    image: 'enemy_1.png',
    stats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
    },
    goldDrop: new Decimal(1),
    itemsDrop: [{ itemId: 1, chance: 100 }],
  },
  {
    id: 2,
    name: 'Eduardo do Janela da Rua',
    image: 'enemy_2.png',
    stats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
    },
    goldDrop: new Decimal(1),
    itemsDrop: [{ itemId: 1, chance: 100 }],
  },
  {
    id: 3,
    name: 'Sapo Tchola',
    image: 'enemy_3.png',
    stats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
    },
    goldDrop: new Decimal(1),
    itemsDrop: [{ itemId: 1, chance: 100 }],
  },
]
