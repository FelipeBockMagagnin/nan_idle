import Decimal from 'break_infinity.js'
import { TrainingSkillsEnum, SkillType, UnlockableEnum } from '@/domain/enums'
import { Skill } from '@/domain/entities/Skill'
import { PlayerResources, PlayerStats } from '@/domain/entities/Player'
import { PlayerAdventureStats } from '@/domain/entities/AdventurePlayer'
import { Energy } from '@/domain/entities/Energy'
import {
  SpendXpCosts,
  XpUpgradeType,
} from '@/application/services/PlayerXpService'
import { Unlockable } from '@/domain/entities/Unlockable'
import {
  alertService,
  AlertTypeEnum,
} from '@/application/services/AlertService'
import { navigationService } from '@/application/services/NavigationService'

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
      toughness: new Decimal(10),
      currentHP: new Decimal(50),
      maxHP: new Decimal(50),
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
      id: TrainingSkillsEnum.RegularAttack,
      skillType: SkillType.Attack,
      name: 'Regular Attack',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(50),
      baseStatsPerLevel: new Decimal(150),
      unlocksSkill: TrainingSkillsEnum.IdleAttack,
      combatMultiplier: 1,
      currentAttackCooldown: 0,
      attackCooldown: 1,
      unlocked: true,
    }),

    new Skill({
      id: TrainingSkillsEnum.IdleAttack,
      skillType: SkillType.Attack,
      name: 'Idle Attack',
      level: new Decimal(0),
      progress: new Decimal(0),
      allocatedEnergy: new Decimal(0),
      baseEnergyCost: new Decimal(300),
      baseStatsPerLevel: new Decimal(1000),
      unlocksSkill: null,
      combatMultiplier: 1,
      currentAttackCooldown: 0,
      attackCooldown: 1,
      unlocked: false,
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
      unlocksSkill: TrainingSkillsEnum.DefensiveBuff,
      combatMultiplier: 0,
      currentAttackCooldown: 0,
      attackCooldown: 10,
      unlocked: true,
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
      unlocksSkill: null,
      combatMultiplier: 0,
      currentAttackCooldown: 1,
      attackCooldown: 30,
      unlocked: false,
    }),
  ] as Skill[],

  Unlockables: [
    new Unlockable(
      UnlockableEnum.FightBoss,
      (_bossId, attackPower) => attackPower.greaterThan(10000),
      () => {
        alertService.showAlert(
          'Face powerful bosses to advance further and unlock new game mechanics.',
          AlertTypeEnum.Confirm,
          'Boss Fight unlocked!'
        )
        navigationService.navigate('Fight Boss')
      }
    ),
    new Unlockable(
      UnlockableEnum.SpendXP,
      (bossId) => bossId >= 4,
      () => {
        alertService.showAlert(
          'Here you can spend your XP to permanently improve your attributes.',
          AlertTypeEnum.Confirm,
          'Spend XP unlocked!'
        )
        navigationService.navigate('Spend XP')
      }
    ),
    new Unlockable(
      UnlockableEnum.Adventure,
      (bossId) => bossId >= 5,
      () => {
        alertService.showAlert(
          'You can now face enemies in different zones to earn items, boosts, and XP.',
          AlertTypeEnum.Confirm,
          'Adventure Mode and Inventory unlocked!'
        )
        navigationService.navigate('Adventure')
      }
    ),
    new Unlockable(
      UnlockableEnum.Inventory,
      (bossId) => bossId >= 6,
      () => {}
    ),
  ] as Unlockable[],
}
