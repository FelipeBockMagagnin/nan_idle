import { UnlockableEnum } from '@/domain/enums'
import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { IUnlockableRepository } from '@/domain/interfaces/repositories/IUnlockableRepository'

export class FeatureUnlockedUseCase {
  constructor(
    private bossFightRepository: IBossFightRepository,
    private playerRepository: IPlayerRepository,
    private unlockableRepository: IUnlockableRepository
  ) {}

  execute(unlockable: UnlockableEnum): boolean {
    const bossId = this.bossFightRepository.getBossFight().bossId
    const playerAttack = this.playerRepository.getPlayer().stats.attack

    const entity = this.unlockableRepository.getByID(unlockable)

    return entity ? entity.checkAndUnlock(bossId, playerAttack) : false
  }
}
