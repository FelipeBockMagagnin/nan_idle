import { AlertTypeEnum, showAlert } from '@/application/services/AlertService'
import { TrainingSkillsEnum } from '@/domain/enums'
import { IAdventurePlayerRepository } from '@/domain/interfaces/repositories/IAdventurePlayerRepository'
import { IAdventureRepository } from '@/domain/interfaces/repositories/IAdventureRepository'
import { IInventoryRepository } from '@/domain/interfaces/repositories/IInventoryRepository'
import { IItemRepository } from '@/domain/interfaces/repositories/IItemRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import Decimal from 'break_infinity.js'

export class PlayerAttackUseCase {
  constructor(
    private adventureRepository: IAdventureRepository,
    private adventurePlayerRepository: IAdventurePlayerRepository,
    private trainingRepository: ITrainingRepository,
    private inventoryRepostiory: IInventoryRepository,
    private itemRepository: IItemRepository
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
      //Todo check gold drop

      const inventory = this.inventoryRepostiory.getInventory()

      const dropBonus = new Decimal(1)
      const itemsDroped = adventure.getItemsDroppedIds(dropBonus)
      if (itemsDroped.length > 0) {
        itemsDroped.forEach((itemId) => {
          const item = this.itemRepository.getItem(itemId)
          if (item) {
            showAlert(`Dropeed ${item?.name} item`)
            inventory.addItem(item)
          }
        })
      }

      const boostLevelDropped = adventure.getDroppedBoostLevel(dropBonus)

      if (boostLevelDropped) {
        const boost =
          this.itemRepository.getRandomItemBoostByLevel(boostLevelDropped)

        if (boost) {
          showAlert(`Dropeed ${boost?.name} boost`)
          inventory.addItem(boost)
        }
      }

      adventure.clearEnemy()
      return
    }
  }
}
