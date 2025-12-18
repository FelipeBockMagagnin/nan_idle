import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HP } from '@/types'

export const useHPStore = defineStore(
  'hp',
  () => {
  const hp = ref<HP>({
    current: 100,
    max: 100,
  })

  return {
    hp,
  }
},
  { persist: true }
)
