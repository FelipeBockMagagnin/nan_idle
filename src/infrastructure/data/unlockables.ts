import { GameConfig } from '../config/GameConfig'
import { Unlockable } from '@/domain/entities/Unlockable'

export const getInitialUnlockables = (): Unlockable[] => {
  return GameConfig.Unlockables
}
