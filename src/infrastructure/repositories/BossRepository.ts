import { enemies, IEnemyData } from '@/infrastructure/data/enemies'
import { Boss } from '@/domain/entities/Boss'

export class BossRepository {
  private static enemies: IEnemyData[] = enemies

  static getEnemy(id: number): Boss | null {
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
