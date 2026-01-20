import { enemies, IEnemyData } from '@/infrastructure/data/enemies'
import { Boss } from '@/domain/entities/Boss'
import { IBossRepository } from '@/domain/interfaces/repositories/IBossRepository'

export class BossRepository implements IBossRepository {
  private enemies: IEnemyData[] = enemies

  getEnemy(id: number): Boss | null {
    const enemyData = this.enemies.find((b) => b.id === id)
    if (enemyData) {
      return new Boss({
        id: enemyData.id,
        name: enemyData.name,
        image: enemyData.image,
        stats: enemyData.bossStats,
      })
    }
    return null
  }
}
