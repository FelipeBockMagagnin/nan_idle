import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import { ITrainingRepository } from '@/domain/interfaces/repositories/ITrainingRepository'
import { IStorageService } from '@/domain/interfaces/services/IStorageService'
import { GlobalSaveData } from '@/domain/entities/saveData'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'

export class SaveGameUseCase {
  constructor(
    private storageService: IStorageService,
    private playerRepository: IPlayerRepository,
    private trainingRepository: ITrainingRepository,
    private energyRepository: IEnergyRepository
  ) {}

  execute(): void {
    const data: GlobalSaveData = {
      meta: {
        version: 1,
        lastLoginTimestamp: Date.now(),
      },
      player: this.playerRepository.exportData(),
      training: this.trainingRepository.exportData(),
      energy: this.energyRepository.exportData()
    }

    this.storageService.save(data)
  }
}
