import type { AdventureZone } from '@/types'

export const adventureZones: AdventureZone[] = [
  {
    id: 0,
    name: 'Safe Zone',
    enemyIds: [],
  },
  {
    id: 1,
    name: 'Tutorial',
    enemyIds: [1, 2, 3],
  },
  {
    id: 2,
    name: 'Sewers',
    enemyIds: [2],
  },
]
