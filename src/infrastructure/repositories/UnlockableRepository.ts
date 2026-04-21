import { IUnlockableRepository } from '@/domain/interfaces/repositories/IUnlockableRepository'
import { UnlockableEnum } from '@/domain/enums'
import { reactive } from 'vue'
import { Unlockable } from '@/domain/entities/Unlockable'
import { getInitialUnlockables } from '../data/unlockables'

let unlockableInstance: Unlockable[] = []

export class UnlockableRepository implements IUnlockableRepository {
  getAll(): Unlockable[] {
    if (unlockableInstance.length === 0) {
      unlockableInstance = reactive(getInitialUnlockables()) as Unlockable[]
    }

    return unlockableInstance
  }

  getByID(id: UnlockableEnum): Unlockable | undefined {
    return this.getAll().find((unlockable) => unlockable.unlockableId === id)
  }
}
