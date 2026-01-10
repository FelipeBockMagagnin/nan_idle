import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { TrainingSkillsEnum } from '@/domain/enums'

export class SetSelectedAttackUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private trainingRepository: ITrainingRepository
  ) {}

  execute(skillId: TrainingSkillsEnum): void {
    const adventure = this.adventureRepository.getAdventure()
    const skill = this.trainingRepository.getSkill(skillId)
    adventure.setPlayerAtack(skill || null)
  }
}
