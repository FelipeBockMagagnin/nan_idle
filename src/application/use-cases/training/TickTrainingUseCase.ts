import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { SkillType } from '@/domain/enums'

export class TickTrainingUseCase {
  constructor(
    private trainingRepository: ITrainingRepository,
    private playerRepository: IPlayerRepository
  ) {}

  execute(deltaTime: number): void {
    const skills = this.trainingRepository.getSkills()
    const player = this.playerRepository.getPlayer()

    for (const key in skills) {
      const skill = skills[key]
      const skillOldLevel = skill.level
      if (skill.tick(deltaTime)) {
        if (skill.skillType === SkillType.Attack) {
          player.trainAttack(
            skill.baseStatsPerLevel,
            skill.level,
            skillOldLevel
          )
        } else if (skill.skillType === SkillType.Defence) {
          player.trainDefence(
            skill.baseStatsPerLevel,
            skill.level,
            skillOldLevel
          )
        }

        if (skill.unlocksSkill) {
          if (skill.level.greaterThanOrEqualTo(5000)) {
            const unlockedSkill = this.trainingRepository.getSkill(
              skill.unlocksSkill
            )
            if (unlockedSkill) {
              unlockedSkill.setUnlocked(true)
            }
          }
        }
      }
    }
  }
}
