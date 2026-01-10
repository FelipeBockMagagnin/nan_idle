import { GlobalSaveData } from '@/domain/entities/saveData'

export interface IStorageService {
  save(data: GlobalSaveData): void
  load(): GlobalSaveData | null
  clear(): void
}