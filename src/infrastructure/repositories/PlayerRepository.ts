import { Player } from '@/domain/entities/Player'
import type { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import Decimal from 'break_infinity.js'
import { PlayerSaveData } from '@/domain/types/saveData'
import { GameConfig } from '../config/GameConfig'

let playerIntance: Player | null = null
export class PlayerRepository implements IPlayerRepository {
  getPlayer(): Player {
    if (!playerIntance) {
      playerIntance = new Player(GameConfig.Player.InitialStats)
    }

    return playerIntance
  }

  exportData(): PlayerSaveData {
    const player = this.getPlayer()

    return {
      stats: {
        attack: player.stats.attack.toString(),
        defence: player.stats.defence.toString(),
        hpRegen: player.stats.hpRegen.toString(),
        maxHP: player.stats.maxHP.toString(),
      },
    }
  }

  importData(data: PlayerSaveData) {
    const player = this.getPlayer()
    if (data.stats) {
      player.stats.attack = new Decimal(data.stats.attack)
      player.stats.defence = new Decimal(data.stats.defence)
      player.stats.hpRegen = new Decimal(data.stats.hpRegen)
      player.stats.maxHP = new Decimal(data.stats.maxHP)
    }
  }

  static reset(): void {
    playerIntance = null
  }
}
