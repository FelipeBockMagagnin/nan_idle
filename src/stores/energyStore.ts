import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Energy } from '@/types'
import Decimal from 'break_infinity.js'

export const useEnergyStore = defineStore(
  'energy',
  () => {
    const energy = ref<Energy>({
      current: new Decimal(0),
      allocated: new Decimal(0),
      max: new Decimal(100),
    })

    function allocateEnergy(value: Decimal): boolean {
      if (value.greaterThan(getAvailableEnergy())) {
        return false
      }

      energy.value.allocated = energy.value.allocated.plus(value)
      return true
    }

    function reclaimEnergy(value: Decimal): boolean {
      if (value.greaterThan(energy.value.allocated)) {
        return false
      }

      if (energy.value.allocated.subtract(value).lessThan(new Decimal(0))) {
        return false
      }

      energy.value.allocated = energy.value.allocated.subtract(value)
      return true
    }

    function getAvailableEnergy(): Decimal {
      return energy.value.current.subtract(energy.value.allocated)
    }

    function regenEnergy(value: Decimal): void {
      if (energy.value.current.equals(energy.value.max)) return

      energy.value.current = energy.value.current.plus(value)
    }

    return {
      energy,
      regenEnergy,
      allocateEnergy,
      reclaimEnergy,
      getAvailableEnergy,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) =>
          JSON.stringify({
            energy: {
              current: state.energy.current.toString(),
              allocated: state.energy.allocated.toString(),
              max: state.energy.max.toString(),
            },
          }),
        deserialize: (str) => {
          const data = JSON.parse(str)
          return {
            energy: {
              current: new Decimal(data.energy.current),
              allocated: new Decimal(data.energy.allocated),
              max: new Decimal(data.energy.max),
            },
          }
        },
      },
    },
  }
)
