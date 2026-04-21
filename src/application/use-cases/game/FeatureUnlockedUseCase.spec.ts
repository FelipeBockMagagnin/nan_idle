import { describe, it, expect, vi, beforeEach } from 'vitest'
import { FeatureUnlockedUseCase } from './FeatureUnlockedUseCase'
import { UnlockableEnum } from '@/domain/enums'
import { IBossFightRepository } from '@/domain/interfaces/repositories/IBossFightRepository'
import { IUnlockableRepository } from '@/domain/interfaces/repositories/IUnlockableRepository'
import { Unlockable } from '@/domain/entities/Unlockable'
import { IPlayerRepository } from '@/domain/interfaces/repositories/IPlayerRepository'
import Decimal from 'break_infinity.js'

describe('FeatureUnlockedUseCase', () => {
  let useCase: FeatureUnlockedUseCase
  let mockBossRepo: IBossFightRepository
  let mockPlayerRepo: IPlayerRepository
  let mockUnlockableRepo: IUnlockableRepository

  beforeEach(() => {
    mockBossRepo = {
      getBossFight: vi.fn().mockReturnValue({ bossId: 2 }),
    } as unknown as IBossFightRepository

    mockUnlockableRepo = {
      getByID: vi.fn(),
    } as unknown as IUnlockableRepository

    mockPlayerRepo = {
      getPlayer: vi.fn().mockReturnValue({ stats: { attack: new Decimal(2) } }),
    } as unknown as IPlayerRepository

    useCase = new FeatureUnlockedUseCase(
      mockBossRepo,
      mockPlayerRepo,
      mockUnlockableRepo
    )
  })

  it('should return false if unlockable entity does not exist', () => {
    vi.mocked(mockUnlockableRepo.getByID).mockReturnValue(undefined)
    const result = useCase.execute(UnlockableEnum.Adventure)
    expect(result).toBe(false)
  })

  it('should return true if unlockable requirement is met', () => {
    const entity = new Unlockable(
      UnlockableEnum.Adventure,
      (id, power) => id > 1 || power.greaterThan(1),
      () => {}
    )
    vi.mocked(mockUnlockableRepo.getByID).mockReturnValue(entity)

    const result = useCase.execute(UnlockableEnum.Adventure)

    expect(result).toBe(true)
  })

  it('should return false if unlockable requirement is not met', () => {
    const entity = new Unlockable(
      UnlockableEnum.Adventure,
      (id, power) => id > 100 || power.greaterThan(3),
      () => {}
    )
    vi.mocked(mockUnlockableRepo.getByID).mockReturnValue(entity)

    const result = useCase.execute(UnlockableEnum.Adventure)

    expect(result).toBe(false)
  })
})
