import { Skill } from '@/domain/entities/Skill'
import { GameConfig } from '../config/GameConfig'

export const getInitialSkills = (): Skill[] => {
  return GameConfig.Skills
}
