import { TrainingSkillsEnum, SkillType } from '@/domain/enums'
import Decimal from 'break_infinity.js'
import { Skill } from '@/domain/entities/Skill'

export const getInitialSkills = (): Skill[] => {
  return [
    new Skill(
      TrainingSkillsEnum.RegularAttack,
      SkillType.Attack,
      new Decimal(0),
      new Decimal(0),
      new Decimal(0),
      new Decimal(10),
      new Decimal(1),
      new Decimal(0),
      new Decimal(0)
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
      new Decimal(0)
    ),
  ]
}
