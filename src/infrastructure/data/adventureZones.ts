import type { AdventureZone } from '@/domain/entities/Adventure'

export const adventureZones: AdventureZone[] = [
  {
    id: 0,
    name: 'Safe Zone',
    enemyIds: [],
  },
  {
    id: 1,
    name: 'Tutorial',
    enemyIds: [1],
  },
  {
    id: 2,
    name: 'Sewers',
    enemyIds: [2],
  },
]
