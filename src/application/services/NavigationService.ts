export class NavigationService {
  private listeners: ((routeName: string) => void)[] = []

  subscribe(listener: (routeName: string) => void): void {
    this.listeners.push(listener)
  }

  unsubscribe(listener: (routeName: string) => void): void {
    this.listeners = this.listeners.filter((l) => l !== listener)
  }

  navigate(routeName: string): void {
    this.listeners.forEach((listener) => listener(routeName))
  }
}

export const navigationService = new NavigationService()
