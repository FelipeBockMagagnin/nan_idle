import { Player } from '@/domain/entities/Player'
import type { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import Decimal from 'break_infinity.js'
import { PlayerSaveData } from '@/domain/types/saveData'
import { GameConfig } from '../config/GameConfig'
import { reactive } from 'vue'

let playerIntance: Player | null = null
export class PlayerRepository implements IPlayerRepository {
  getPlayer(): Player {
    if (!playerIntance) {
      playerIntance = reactive(
        new Player(
          GameConfig.Player.InitialStats,
          GameConfig.Player.InitialResources
        )
      ) as Player
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
        resources: {
          gold: player.resources.gold.toString(),
          xp: player.resources.xp.toString(),
        },
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
      player.resources.gold = new Decimal(data.stats.resources.gold)
      player.resources.xp = new Decimal(data.stats.resources.xp)
    }
  }

  static reset(): void {
    playerIntance = null
  }
}
