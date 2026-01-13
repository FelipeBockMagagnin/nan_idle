import { defineStore } from 'pinia'
import { ref } from 'vue'
import { alertService } from '@/application/services/AlertService'

interface Alert {
  id: number
  message: string
}

export const useAlertStore = defineStore('alert', () => {
  const alerts = ref<Alert[]>([])
  let idCounter = 0

  function addAlert(message: string) {
    const id = idCounter++
    alerts.value.push({ id, message })

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
