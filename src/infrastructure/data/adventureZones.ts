import type { AdventureZone } from '@/domain/entities/Adventure'
import Decimal from 'break_infinity.js'

export const adventureZones: AdventureZone[] = [
  {
    id: 0,
    name: 'Safe Zone',
    enemyIds: [],
    bossDropChance: [],
    enemyDropChance: [],
  },
  {
    id: 1,
    name: 'Tutorial',
    enemyIds: [1, 2],
    bossDropChance: [
      {
        itemId: 1,
        chance: 25,
      },
      {
        itemId: 2,
        chance: 25,
      },
      {
        itemId: 3,
        chance: 25,
      },
      {
        itemId: 4,
        chance: 25,
      },
    ],
    enemyDropChance: [
      {
        itemId: 5,
        chance: 25,
      },
    ],
    enemyGoldDrop: new Decimal(450),
    bossGoldDrop: new Decimal(900),
    xpDropChance: new Decimal(7),
    boostDropChance: {
      chance: 5,
      boostLevel: 1,
    },
    boostLevel: 1,
  },
  {
    id: 2,
    name: 'Sewers',
    enemyIds: [3, 4, 5],
    bossDropChance: [],
    enemyDropChance: [],
  },
]
