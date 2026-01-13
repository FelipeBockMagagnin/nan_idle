import { Skill } from '@/domain/entities/Skill'
import { TrainingSkillsEnum } from '@/domain/enums'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'

export class GetPlayerSkillUseCase {
  constructor(private trainingRepository: ITrainingRepository) {}

  execute(skillId: TrainingSkillsEnum): Skill | undefined {
    return this.trainingRepository.getSkill(skillId)
  }
}
