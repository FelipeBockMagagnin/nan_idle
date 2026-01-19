import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { SkillType } from '@/domain/enums'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'

export class TickTrainingUseCase {
  constructor(
    private trainingRepository: ITrainingRepository,
    private playerRepository: IPlayerRepository,
    private energyRepository: IEnergyRepository
  ) {}

  execute(deltaTime: number): void {
    const skills = this.trainingRepository.getSkills()
    const player = this.playerRepository.getPlayer()
    const energy = this.energyRepository.getEnergy()

    for (const key in skills) {
      const skill = skills[key]
      if (skill.tick(energy.power.times(deltaTime).toNumber())) {
        if (skill.skillType === SkillType.Attack) {
          player.trainAttack(skill.baseStatsPerLevel)
        } else if (skill.skillType === SkillType.Defence) {
          player.trainDefence(skill.baseStatsPerLevel)
        }
      }
    }
  }
}
