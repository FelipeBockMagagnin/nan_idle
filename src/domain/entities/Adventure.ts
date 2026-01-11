import { Boss } from '@/domain/entities/Boss'
import { Skill } from '@/domain/entities/Skill'
import { Player } from '@/domain/entities/Player'

export type AdventureTickResult = {
  enemyDefeated: boolean
  playerDied: boolean
}

export type AdventureZone = {
  id: number
  name: string
  enemyIds: number[]
}

export class Adventure {
  private _currentEnemy: Boss | null = null
  private _playerSelectedAttack: Skill | null = null
  private _adventureZone: AdventureZone | null = null

  constructor(adventureZone: AdventureZone | null) {
    this._adventureZone = adventureZone
  }

  get zoneId(): number {
    if (!this._adventureZone?.id) return 0
    return this._adventureZone.id
  }

  get currentEnemy(): Boss | null {
    return this._currentEnemy
  }

  get playerSelectedAttack(): Skill | null {
    return this._playerSelectedAttack
  }

  enterZone(adventureZone: AdventureZone | null): void {
    this._adventureZone = adventureZone
    this._currentEnemy = null
    this._playerSelectedAttack = null
  }

  getNextEnemyId(): number {
    if (!this._adventureZone) return 0
    return this._adventureZone.enemyIds[
      Math.floor(Math.random() * this._adventureZone.enemyIds.length)
    ]
  }

  setEnemy(enemy: Boss): void {
    this._currentEnemy = enemy
  }

  setPlayerAtack(skill: Skill | null): void {
    this._playerSelectedAttack = skill
  }

  clearEnemy(): void {
    this._currentEnemy = null
    this._playerSelectedAttack = null
  }

  tick(deltaTime: number, player: Player): AdventureTickResult {
    const result: AdventureTickResult = {
      enemyDefeated: false,
      playerDied: false,
    }

    if (!this._currentEnemy) return result

    // Player attacks enemy
    if (this._playerSelectedAttack) {
      const damage = this._playerSelectedAttack.level

      if (this._currentEnemy.takeDamage(damage)) {
        this.clearEnemy()
        result.enemyDefeated = true
        return result
      }

      this._playerSelectedAttack = null
    }

    // Enemy Attacks Player
    if (player.takeDamage(this._currentEnemy.stats.attack)) {
      result.playerDied = true
      return result
    }

    // Regen Enemy HP if alive
    this._currentEnemy.regenerate(deltaTime)

    return result
  }
}
