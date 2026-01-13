import {
  AdventurePlayer,
  PlayerAdventureStats,
} from '@/domain/entities/AdventurePlayer'
import Decimal from 'break_infinity.js'
import { reactive } from 'vue'

let playerIntance: AdventurePlayer | null = null

export class AdventurePlayerRepository {
  getAdventurePlayer(): AdventurePlayer {
    if (!playerIntance) {
      const initialStats: PlayerAdventureStats = {
        power: new Decimal(1),
        toughness: new Decimal(1),
        currentHP: new Decimal(100),
        maxHP: new Decimal(100),
        hpRegen: new Decimal(1),
      }
      playerIntance = reactive(new AdventurePlayer(initialStats)) as AdventurePlayer
    }

    return playerIntance
  }
}
