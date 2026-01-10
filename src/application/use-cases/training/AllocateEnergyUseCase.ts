import { TrainingSkillsEnum } from '@/domain/enums'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import Decimal from 'break_infinity.js'

export class AllocateEnergyUseCase {
  constructor(private trainingRepository: ITrainingRepository, private energyRepository: IEnergyRepository) {}

  execute(skillId: TrainingSkillsEnum, amount: Decimal): boolean {
    const skill = this.trainingRepository.getSkill(skillId)
    if (!skill) return false

    const energy = this.energyRepository.getEnergy()

    if(!energy.allocateEnergy(amount)) {
      return false
    }

    return skill.allocateEnergy(amount)
  }
}
