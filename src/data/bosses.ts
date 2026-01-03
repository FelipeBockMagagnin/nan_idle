import type { Boss } from '@/types'
import Decimal from 'break_infinity.js'

export const bosses: Boss[] = [
  {
    id: 1,
    name: 'Tieppo',
    image: 'src/assets/enemy/enemy_1.png',
    stats: {
      hp: new Decimal(100),
      attack: new Decimal(5),
      defence: new Decimal(2),
      hpRegen: new Decimal(0),
      maxHp: new Decimal(100),
      xp: new Decimal(1),
    },
  },
  {
    id: 2,
    name: 'Dudi Negativo',
    image: 'src/assets/enemy/enemy_2.png',
    stats: {
      hp: new Decimal(250),
      attack: new Decimal(10),
      defence: new Decimal(5),
      hpRegen: new Decimal(1),
      maxHp: new Decimal(250),
      xp: new Decimal(2),
    },
  },
]
