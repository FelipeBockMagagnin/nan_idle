type AlertListener = (message: string, type: AlertTypeEnum) => void

export enum AlertTypeEnum {
  Success = 1,
  Error = 2,
  Warning = 3,
}

export class AlertService {
  private listeners: AlertListener[] = []

  subscribe(listener: AlertListener): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: AlertListener): void {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  showAlert(message: string, type: AlertTypeEnum): void {
    this.listeners.forEach((listener) => listener(message, type))
  }
}

export const alertService = new AlertService()

export function showAlert(message: string, type: AlertTypeEnum = 1) {
  alertService.showAlert(message, type)
}
