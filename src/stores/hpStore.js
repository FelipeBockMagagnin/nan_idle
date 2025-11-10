import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHPStore = defineStore('hp', () => {
  const hp = ref({
    current: 100,
    max: 100,
  })

  return {
    hp,
  }
})
