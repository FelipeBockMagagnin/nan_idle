import { container } from '@/infrastructure/container'
import { GameLoop } from '@/infrastructure/services/GameLoop'

export class GameService {
  private regenEnergyUseCase = container.regenEnergyUseCase
  private tickTrainingUseCase = container.tickTrainingUseCase
  private tickAdventureUseCase = container.tickAdventureUseCase
 // private fightBossTickUseCase = container.fightBossTickUseCase
  private regenHealthUseCase = container.regenHealthUseCase

  constructor(private gameLoop: GameLoop) {
    this.gameLoop.subscribe(this.onTick)
  }

  private onTick = (deltaTime: number) => {
    this.regenEnergyUseCase.execute(deltaTime)
    this.tickTrainingUseCase.execute(deltaTime)
    this.tickAdventureUseCase.execute(deltaTime)
    //this.fightBossTickUseCase.execute(deltaTime)
    this.regenHealthUseCase.execute(deltaTime)
  }

  start() {
    this.gameLoop.start()
  }

  stop() {
    this.gameLoop.stop()
  }
}
