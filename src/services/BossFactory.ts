import { bosses } from '@/data/bosses'
import type { Boss } from '@/types'

export class BossFactory {
  private static bosses: Boss[] = bosses

  public static getBoss(index: number): Boss | undefined {
    const boss = this.bosses[index]
    if (!boss) {
      return undefined
    }

    return {
      ...boss,
    }
  }
}
