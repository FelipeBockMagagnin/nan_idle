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
      attack: new Decimal(100),
      defence: new Decimal(100),
      currentHP: new Decimal(1000),
      maxHP: new Decimal(1000),
      hpRegen: new Decimal(5),
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
    [XpUpgradeType.ENERGY_CAP]: { cost: 40, gain: 10000 },
    [XpUpgradeType.ENERGY_REGENERATION_RATE]: { cost: 2, gain: 0.1 },
    [XpUpgradeType.ENERGY_POWER]: { cost: 15, gain: 0.1 },
    [XpUpgradeType.ENERGY_BARS]: { cost: 80, gain: 1 },
  } as SpendXpCosts,

  Energy: new Energy({
    allocated: new Decimal(0),
    current: new Decimal(250),
    max: new Decimal(500),
    power: new Decimal(1),
    regenerationRate: new Decimal(1),
    bars: new Decimal(1),
  }),

  Skills: [
    new Skill({
      id: TrainingSkillsEnum.IdleAttack,
      skillType: SkillType.Attack,
      name: 'Idle Attack',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(50),
      baseStatsPerLevel: new Decimal(150),
      unlockThreshold: new Decimal(0),
      combatMultiplier: 1,
      currentAttackCooldown: 1,
      attackCooldown: 1,
    }),

    new Skill({
      id: TrainingSkillsEnum.RegularAttack,
      skillType: SkillType.Attack,
      name: 'Regular Attack',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(300),
      baseStatsPerLevel: new Decimal(1000),
      unlockThreshold: new Decimal(5000),
      combatMultiplier: 1,
      currentAttackCooldown: 1,
      attackCooldown: 1,
    }),

    new Skill({
      id: TrainingSkillsEnum.Block,
      skillType: SkillType.Defence,
      name: 'Block',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(50),
      baseStatsPerLevel: new Decimal(150),
      unlockThreshold: new Decimal(0),
      combatMultiplier: 0,
      currentAttackCooldown: 1,
      attackCooldown: 1,
    }),

    new Skill({
      id: TrainingSkillsEnum.DefensiveBuff,
      skillType: SkillType.Defence,
      name: 'Defensive Buff',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(300),
      baseStatsPerLevel: new Decimal(1000),
      unlockThreshold: new Decimal(5000),
      combatMultiplier: 0,
      currentAttackCooldown: 1,
      attackCooldown: 10,
    }),
  ] as Skill[],
}
