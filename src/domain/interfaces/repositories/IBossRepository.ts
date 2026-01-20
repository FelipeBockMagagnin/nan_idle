import { Boss } from '@/domain/entities/Boss'

export interface IBossRepository {
  getEnemy(id: number): Boss | null
}
