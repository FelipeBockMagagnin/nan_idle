import type { Player } from '@/domain/entities/Player'
import { IPersistableRepository } from '@/domain/interfaces/repositories/IPersistableRepository'
import { PlayerSaveData } from '@/domain/types/saveData'

export interface IPlayerRepository extends IPersistableRepository<PlayerSaveData> {
  getPlayer(): Player
}
