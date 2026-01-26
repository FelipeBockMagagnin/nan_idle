import { BoostOptions } from '@/domain/entities/Boost'
import { ItemTypeEnum } from '@/domain/enums'

export const boosts: BoostOptions[] = [
  {
    id: 6,
    name: 'Power Boost 1',
    image: '/assets/boosts/boost_power_1.png',
    boostLevel: 1,
    level: 1,
    type: ItemTypeEnum.PowerBoost,
  },
  {
    id: 7,
    name: 'Toughness Boost 1',
    image: '/assets/boosts/boost_toughness_1.png',
    boostLevel: 1,
    level: 1,
    type: ItemTypeEnum.ToughnessBoost,
  },
  {
    id: 8,
    name: 'Special Boost 1',
    image: '/assets/boosts/boost_special_1.png',
    boostLevel: 1,
    level: 1,
    type: ItemTypeEnum.SpecialBoost,
  },
]
