import { Energy } from '@/domain/entities/Energy'
import { EnergySaveData } from '@/domain/types/saveData'
import { IEnergyRepository } from '@/domain/interfaces/repositories/IEnergyRepository'
import Decimal from 'break_infinity.js'

let energyInstance: Energy | null = null

export class EnergyRepository implements IEnergyRepository {
  getEnergy(): Energy {
    if (!energyInstance) {
      energyInstance = new Energy(
        new Decimal(0),
        new Decimal(0),
        new Decimal(100),
        new Decimal(1)
      )
    }
    return energyInstance
  }

  exportData(): EnergySaveData {
    const energy = this.getEnergy()

    return {
      allocated: energy.allocated.toString(),
      current: energy.current.toString(),
      max: energy.max.toString(),
    }
  }

  importData(data: EnergySaveData): void {
    const energy = this.getEnergy()
    if (data) {
      energy.current = new Decimal(data.current)
      energy.allocated = new Decimal(data.allocated)
      energy.max = new Decimal(data.max)
    }
  }
}
