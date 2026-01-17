import { AdventurePlayer } from '@/domain/entities/AdventurePlayer'
import { reactive } from 'vue'
import { GameConfig } from '../config/GameConfig'

let playerIntance: AdventurePlayer | null = null

export class AdventurePlayerRepository {
  getAdventurePlayer(): AdventurePlayer {
    if (!playerIntance) {
      playerIntance = reactive(
        new AdventurePlayer(GameConfig.Player.InitialAdventureStats)
      ) as AdventurePlayer
    }

    return playerIntance
  }
}
