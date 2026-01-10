import { ItemSlotEnum } from '@/domain/enums'

export type ItemDrop = {
  itemId: number
  chance: number
}

export type Item = {
  id: number
  slot: ItemSlotEnum
  name: string
  stats: any 
}
