import { enemies } from '@/data/enemies'
import type { Enemy } from '@/types'

export class EnemyFactory {
  private static enemies: Enemy[] = enemies

  static getEnemy(id: number): Enemy | undefined {
    const enemy = this.enemies.find((b) => b.id === id)
    if (enemy) {
      return enemy
    }
    return undefined
  }
}
