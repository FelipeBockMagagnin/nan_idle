import { Unlockable } from '@/domain/entities/Unlockable'
import { UnlockableEnum } from '@/domain/enums'

export interface IUnlockableRepository {
  getAll(): Unlockable[]
  getByID(id: UnlockableEnum): Unlockable | undefined
}
