import Decimal from 'break_infinity.js'
import { UnlockableEnum } from '../enums'

export type UnlockFunction = (bossId: number, attackPower: Decimal) => boolean
export type OnUnlockFunction = () => void

export class Unlockable {
  private id: UnlockableEnum
  private locked: boolean
  private unlockFunction: UnlockFunction
  private onUnlockFunction: OnUnlockFunction

  constructor(
    id: UnlockableEnum,
    unlockFunction: UnlockFunction,
    onUnlockFunction: OnUnlockFunction
  ) {
    this.id = id
    this.locked = true
    this.unlockFunction = unlockFunction
    this.onUnlockFunction = onUnlockFunction
  }

  get unlockableId() {
    return this.id
  }

  get isLocked() {
    return this.locked
  }

  checkAndUnlock(bossId: number, attackPower: Decimal): boolean {
    if (!this.locked) return true

    if (this.unlockFunction(bossId, attackPower)) {
      this.locked = false
      this.onUnlockFunction()
      return true
    }

    return false
  }
}
