import { enemies } from '@/infrastructure/data/enemies'
import { Enemy, type IEnemyData } from '@/domain/entities/Enemy'

export class EnemyRepository {
  private static enemies: IEnemyData[] = enemies

  static getEnemy(id: number): Enemy | null {
    const enemyData = this.enemies.find((b) => b.id === id)
    if (enemyData) {
      return new Enemy(enemyData)
    }
    return null
  }
}
