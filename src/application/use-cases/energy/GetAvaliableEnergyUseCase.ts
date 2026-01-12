import type { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import Decimal from 'break_infinity.js'

export class GetAvaliableEnergyUseCase {
  constructor(private energyRepository: IEnergyRepository) {}

  execute(): Decimal {
    const energy = this.energyRepository.getEnergy()
    return energy.getAvailableEnergy()
  }
}
