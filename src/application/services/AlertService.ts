type AlertListener = (message: string) => void

export class AlertService {
  private listeners: AlertListener[] = []

  subscribe(listener: AlertListener): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: AlertListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  showAlert(message: string): void {
    this.listeners.forEach((listener) => listener(message))
  }
}

export const alertService = new AlertService()

export function showAlert(message: string) {
  alertService.showAlert(message)
}
