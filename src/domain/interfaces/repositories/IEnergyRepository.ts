import { IPersistableRepository } from '@/domain/interfaces/repositories/IPersistableRepository'
import { EnergySaveData } from '@/domain/types/saveData'
import { Energy } from '@/domain/entities/Energy'

export interface IEnergyRepository
  extends IPersistableRepository<EnergySaveData> {
  getEnergy(): Energy
}
