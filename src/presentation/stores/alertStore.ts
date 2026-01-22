import { defineStore } from 'pinia'
import { ref } from 'vue'
import {
  alertService,
  AlertTypeEnum,
} from '@/application/services/AlertService'

export interface Alert {
  id: number
  message: string
  type: AlertTypeEnum
}

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])
  let idCounter = 0

  function addAlert(message: string, type: AlertTypeEnum) {
    const id = idCounter++
    alerts.value.push({ id, message, type })

    setTimeout(() => {
      removeAlert(id)
    }, 2000)
  }

  function removeAlert(id: number) {
    const index = alerts.value.findIndex((alert) => alert.id === id)
    if (index !== -1) {
      alerts.value.splice(index, 1)
    }
  }

  // Subscribe to the framework-agnostic service
  alertService.subscribe(addAlert)

  return {
    alerts,
  }
})
