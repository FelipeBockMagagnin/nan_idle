import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IStorageService } from '@/domain/interfaces/services/IStorageService'

export class LoadGameUseCase {
  constructor(
    private storageService: IStorageService,
    private playerRepository: IPlayerRepository,
    private trainingRepository: ITrainingRepository,
    private energyRepository: IEnergyRepository,
    private bossFightRepository: IBossFightRepository
  ) {}

  execute(): boolean {
    const data = this.storageService.load()
    if (!data) return false

    if (data.player) this.playerRepository.importData(data.player)
    if (data.training) this.trainingRepository.importData(data.training)
    if (data.energy) this.energyRepository.importData(data.energy)
    if (data.currentBossIndex) this.bossFightRepository.importData(data.currentBossIndex)

    return true
  }
}
