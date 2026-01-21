import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IStorageService } from '@/domain/interfaces/services/IStorageService'
import { GlobalSaveData } from '@/domain/types/saveData'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'

export class SaveGameUseCase {
  constructor(
    private storageService: IStorageService,
    private playerRepository: IPlayerRepository,
    private trainingRepository: ITrainingRepository,
    private energyRepository: IEnergyRepository,
    private bossFightRepository: IBossFightRepository
  ) {}

  execute(): void {
    const data: GlobalSaveData = {
      meta: {
        version: 1,
        lastLoginTimestamp: Date.now(),
      },
      player: this.playerRepository.exportData(),
      training: this.trainingRepository.exportData(),
      energy: this.energyRepository.exportData(),
      currentBossIndex: this.bossFightRepository.exportData()
    }

    this.storageService.save(data)
  }
}
