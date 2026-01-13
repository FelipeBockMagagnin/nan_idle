import { TrainingSkillsEnum } from '@/domain/enums'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'

export class GetPlayerAttackCooldownUseCase {
  constructor(private trainingRepository: ITrainingRepository) {}

  execute(skillId: TrainingSkillsEnum): string {
    const skill = this.trainingRepository.getSkill(skillId)
    return skill?.currentAttackCooldown?.toFixed(1) || ''
  }
}
