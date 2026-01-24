import { AlertTypeEnum, showAlert } from '@/application/services/AlertService'
import { TrainingSkillsEnum } from '@/domain/enums'
import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import Decimal from 'break_infinity.js'

export class PlayerAttackUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventurePlayerRepository: IAdventurePlayerRepository,
    private trainingRepository: ITrainingRepository
  ) {}

  execute(skillId: TrainingSkillsEnum): void {
    const skill = this.trainingRepository.getSkill(skillId)

    if (!skill) return

    if (!skill.unlocked) {
      showAlert('Unlock the skill in training', AlertTypeEnum.Error)
      return
    }

    const adventure = this.adventureRepository.getAdventure()

    if (!adventure.currentEnemy) return

    const adventurePlayer = this.adventurePlayerRepository.getAdventurePlayer()

    if (skill.attackOnCooldown()) return

    const enemyDied = adventure.currentEnemy.takeDamage(
      adventurePlayer.stats.power.multiply(skill.combatMultiplier)
    )

    skill.resetAttackCooldown()

    if (enemyDied) {
      showAlert(
        `Enemy defeated. + ${adventure.currentEnemy.stats.goldDrop} gold`
      )
      //TODO calculate drop change and give item
      const dropBonus = new Decimal(1)
      const itemsDroped = adventure.getItemsDroppedIds(dropBonus)
      adventure.clearEnemy()
      showAlert(`Dropeed ${itemsDroped} items`)
      return
    }
  }
}
