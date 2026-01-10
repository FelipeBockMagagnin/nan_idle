import type { IEnemyData } from '@/domain/entities/Enemy'
import Decimal from 'break_infinity.js'

export const enemies: IEnemyData[] = [
  {
    id: 1,
    name: 'Tieppo Emo',
    image: 'enemy_1.png',
    bossStats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      xp: new Decimal(1),
    },
    adventureStats: {
      power: new Decimal(1),
      toughness: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      goldDrop: new Decimal(1),
      itemsDrop: [{ itemId: 1, chance: 100 }],
    },
  },
  {
    id: 2,
    name: 'Tieppo Emo',
    image: 'enemy_1.png',
    bossStats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      xp: new Decimal(1),
    },
    adventureStats: {
      power: new Decimal(1),
      toughness: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      goldDrop: new Decimal(1),
      itemsDrop: [{ itemId: 1, chance: 100 }],
    },
  },
  {
    id: 3,
    name: 'Tieppo Emo',
    image: 'enemy_1.png',
    bossStats: {
      attack: new Decimal(1),
      defence: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      xp: new Decimal(1),
    },
    adventureStats: {
      power: new Decimal(1),
      toughness: new Decimal(1),
      hp: new Decimal(100),
      maxHp: new Decimal(100),
      hpRegen: new Decimal(1),
      goldDrop: new Decimal(1),
      itemsDrop: [{ itemId: 1, chance: 100 }],
    },
  },
]
