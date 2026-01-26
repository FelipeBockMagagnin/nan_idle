import { enemies, IEnemyData } from '@/infrastructure/data/enemies'
import { AdventureEnemy } from '@/domain/entities/AdventureEnemy'

export class AdventureEnemyRepository {
  private static enemies: IEnemyData[] = enemies

  static getEnemy(id: number): AdventureEnemy | null {
    const enemyData = this.enemies.find((b) => b.id === id)
    if (enemyData) {
      return new AdventureEnemy({
        id: enemyData.id,
        name: enemyData.name,
        image: enemyData.image,
        stats: enemyData.adventureStats,
        isBoss: enemyData.isBoss,
      })
    }
    return null
  }
}
