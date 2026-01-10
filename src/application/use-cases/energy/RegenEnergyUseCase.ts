import type { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'

export class RegenEnergyUseCase {
  constructor(private energyRepository: IEnergyRepository) {}

  execute(deltaTime: number) {
    const energy = this.energyRepository.getEnergy()
    energy.regenerate(deltaTime)
  }
}
