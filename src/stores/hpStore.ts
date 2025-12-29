import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { HP } from '@/types'
import Decimal from 'break_infinity.js'

export const useHPStore = defineStore(
  'hp',
  () => {
  const hp = ref<HP>({
    current: new Decimal(100),
    max: new Decimal(100),
  })

  return {
    hp,
  }
},
  {
    persist: {
      serializer: {
        serialize: (state) => JSON.stringify({
          hp: {
            current: state.hp.current.toString(),
            max: state.hp.max.toString(),
          },
        }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            hp: {
              current: new Decimal(data.hp.current),
              max: new Decimal(data.hp.max),
            },
          }
        },
      },
    },
  }
)
