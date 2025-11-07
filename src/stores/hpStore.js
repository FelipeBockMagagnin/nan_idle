import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useHPStore = defineStore('hp', () => {
  const hp = ref({
    current: 100,
    max: 100,
  })

  function changeHP(value) {
    if (hp.value.current - value < 0) {
      return false
    }

    hp.value.current += value
  }

  return {
    hp,
    changeHP,
  }
})
