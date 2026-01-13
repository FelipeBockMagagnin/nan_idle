import { Skill } from '@/domain/entities/Skill'
import { IPersistableRepository } from './IPersistableRepository'
import { TrainingSaveData } from '@/domain/types/saveData'
import { TrainingSkillsEnum } from '@/domain/enums'

export interface ITrainingRepository
  extends IPersistableRepository<TrainingSaveData> {
  getSkills(): Skill[]
  getSkill(id: TrainingSkillsEnum): Skill | undefined
}
