import { reactive } from 'vue'

interface Alert {
  id: number;
  message: string;
}

export const alerts = reactive<Alert[]>([])

let idCounter = 0

export function showAlert(message: string) {
  const id = idCounter++
  alerts.push({ id, message })

  setTimeout(() => {
    const index = alerts.findIndex(alert => alert.id === id)
    if (index !== -1) {
      alerts.splice(index, 1)
    }
  }, 2000)
}