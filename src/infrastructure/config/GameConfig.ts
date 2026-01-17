import Decimal from 'break_infinity.js'
import { TrainingSkillsEnum, SkillType } from '@/domain/enums'
import { Skill } from '@/domain/entities/Skill'
import { PlayerStats } from '@/domain/entities/Player'
import { PlayerAdventureStats } from '@/domain/entities/AdventurePlayer'
import { Energy } from '@/domain/entities/Energy'

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
  },

  Energy: new Energy(
    new Decimal(0),
    new Decimal(0),
    new Decimal(10),
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
