import { Skill } from '@/domain/entities/Skill'
import { TrainingSkillsEnum } from '@/domain/enums'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'

export class SkillsService {
  constructor(private trainingSkillsRepository: ITrainingRepository) {}

  getAllSkills(): Skill[] {
    return this.trainingSkillsRepository.getSkills()
  }

  getSkill(id: TrainingSkillsEnum) {
    return this.trainingSkillsRepository.getSkill(id)
  }
}
