import { Boss } from './Boss'

export class BossFight {
  private currentBoss: Boss | null = null
  private fighting: boolean = false
  private currentBossIndex: number = 1

  constructor() {}

  get boss(): Boss | null {
    return this.currentBoss
  }

  get bossId(): number {
    return this.currentBossIndex
  }

  setBoss(boss: Boss | null): void {
    this.currentBoss = boss
  }

  isFighting(): boolean {
    return this.fighting
  }

  changeFightingState(state: boolean): void {
    this.fighting = state
  }

  defeatBoss() {
    this.currentBossIndex++
    this.setBoss(null)
  }

  setBossCurrentBossIndex(index: number) {
    this.currentBossIndex = index
  }
}
