import { describe, it, expect, vi } from 'vitest'
import { Unlockable } from './Unlockable'
import { UnlockableEnum } from '../enums'
import Decimal from 'break_infinity.js'

describe('Unlockable Entity', () => {
  it('should initialize as locked', () => {
    const entity = new Unlockable(
      UnlockableEnum.Adventure,
      () => false,
      () => {}
    )
    expect(entity.isLocked).toBe(true)
    expect(entity.unlockableId).toBe(UnlockableEnum.Adventure)
  })

  it('should unlock and trigger callback when condition is met', () => {
    const onUnlockFn = vi.fn()
    const entity = new Unlockable(
      UnlockableEnum.Adventure,
      (id) => id > 1,
      onUnlockFn
    )

    const result = entity.checkAndUnlock(2, new Decimal(0))

    expect(result).toBe(true)
    expect(entity.isLocked).toBe(false)
    expect(onUnlockFn).toHaveBeenCalledOnce()
  })

  it('should not unlock when condition is not met', () => {
    const onUnlockFn = vi.fn()
    const entity = new Unlockable(
      UnlockableEnum.Adventure,
      (id) => id > 10,
      onUnlockFn
    )

    const result = entity.checkAndUnlock(2, new Decimal(0))

    expect(result).toBe(false)
    expect(entity.isLocked).toBe(true)
    expect(onUnlockFn).not.toHaveBeenCalled()
  })

  it('should return true immediately if already unlocked', () => {
    const unlockFn = vi.fn().mockReturnValue(true)
    const entity = new Unlockable(UnlockableEnum.Adventure, unlockFn, () => {})

    // Unlock first
    entity.checkAndUnlock(100, new Decimal(0))
    expect(entity.isLocked).toBe(false)

    // Check again
    const result = entity.checkAndUnlock(0, new Decimal(0))
    expect(result).toBe(true)
    expect(unlockFn).toHaveBeenCalledTimes(1) // Not called again
  })
})
