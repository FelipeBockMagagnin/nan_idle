import type { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'

export class RegenHealthUseCase {
  constructor(private playerRepository: IPlayerRepository) {}

  execute(deltaTime: number) {
    const player = this.playerRepository.getPlayer()
    player.regenerate(deltaTime)
  }
}
