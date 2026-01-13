import { GlobalSaveData } from '@/domain/types/saveData'

export interface IStorageService {
  save(data: GlobalSaveData): void
  load(): GlobalSaveData | null
  clear(): void
}