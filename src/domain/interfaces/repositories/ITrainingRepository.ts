import { Skill } from '@/domain/entities/Skill'
import { IPersistableRepository } from './IPersistableRepository'
import { TrainingSaveData } from '@/domain/entities/saveData'

export interface ITrainingRepository
  extends IPersistableRepository<TrainingSaveData> {
  getSkills(): Skill[]
  getSkill(id: number): Skill | undefined
}
