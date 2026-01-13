import { GlobalSaveData } from '@/domain/types/saveData'
import { IStorageService } from '@/domain/interfaces/services/IStorageService'

const SAVE_KEY = 'NAN_IDLE_SAVE_V1'

export class LocalStorageService implements IStorageService {
  save(data: GlobalSaveData): void {
    try {
      const serialized = JSON.stringify(data)
      localStorage.setItem(SAVE_KEY, serialized)
      console.log(`[Storage] Saved ${serialized.length} chars`)
    } catch (e) {
      console.error('[Storage] Save Failed:', e)
    }
  }

  load(): GlobalSaveData | null {
    try {
      const raw = localStorage.getItem(SAVE_KEY)
      if (!raw) return null
      return JSON.parse(raw) as GlobalSaveData
    } catch (e) {
      console.error('[Storage] Corrupt Save:', e)
      return null
    }
  }

  clear(): void {
    localStorage.removeItem(SAVE_KEY)
  }
}