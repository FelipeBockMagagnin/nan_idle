import Decimal from 'break_infinity.js'
import { TrainingSkillsEnum, SkillType } from '@/domain/enums'
import { Skill } from '@/domain/entities/Skill'
import { PlayerResources, PlayerStats } from '@/domain/entities/Player'
import { PlayerAdventureStats } from '@/domain/entities/AdventurePlayer'
import { Energy } from '@/domain/entities/Energy'
import {
  SpendXpCosts,
  XpUpgradeType,
} from '@/application/services/PlayerXpService'

export const GameConfig = {
  Player: {
    InitialStats: {
      attack: new Decimal(0),
      defence: new Decimal(0),
      currentHP: new Decimal(100),
      maxHP: new Decimal(100),
      hpRegen: new Decimal(10),
    } as PlayerStats,
    InitialAdventureStats: {
      power: new Decimal(10),
      toughness: new Decimal(0),
      currentHP: new Decimal(100),
      maxHP: new Decimal(100),
      hpRegen: new Decimal(1),
    } as PlayerAdventureStats,
    InitialResources: {
      xp: new Decimal(0),
      gold: new Decimal(0),
    } as PlayerResources,
  },

  SPEND_XP_COSTS: {
    [XpUpgradeType.ENERGY_CAP]: { cost: 5, gain: 1 },
    [XpUpgradeType.ENERGY_REGENERATION_RATE]: { cost: 10, gain: 0.1 },
    [XpUpgradeType.ENERGY_POWER]: { cost: 50, gain: 1 },
  } as SpendXpCosts,

  Energy: new Energy(
    new Decimal(0),
    new Decimal(0),
    new Decimal(10),
    new Decimal(1),
    new Decimal(1)
  ),

  Skills: [
    new Skill(
      TrainingSkillsEnum.RegularAttack,
      SkillType.Attack,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(10),
      new Decimal(1),
      new Decimal(0),
      new Decimal(1),
      1,
      1,
      1
    ),

    new Skill(
      TrainingSkillsEnum.BlockDefence,
      SkillType.Defence,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(10),
      new Decimal(1),
      new Decimal(0),
      new Decimal(1),
      0,
      1,
      1
    ),
  ] as Skill[],
}
