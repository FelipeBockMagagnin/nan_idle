export class GameManager {
  private static _instance: GameManager

  private TickInterval: number = 1000
  private intervalId: number | null = null
  private subscribers: ((deltaTime: number) => void)[] = []
  private lastTickTimestamp: number = 0

  private constructor() {}

  public static get instance(): GameManager {
    if (!GameManager._instance) {
      GameManager._instance = new GameManager()
    }

    return GameManager._instance
  }

  public subscribe(callback: (deltaTime: number) => void): void {
    this.subscribers.push(callback)
  }

  public unsubscribe(callback: (deltaTime: number) => void): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback)
  }

  public start(): void {
    if (this.intervalId !== null) {
      return
    }

    this.lastTickTimestamp = Date.now()
    this.intervalId = window.setInterval(() => this.tick(), this.TickInterval)
  }

  public stop(): void {
    if (this.intervalId !== null) {
      window.clearInterval(this.intervalId)
      this.intervalId = null
    }
  }

  public tick(): void {
    const now = Date.now()
    const deltaTime = now - this.lastTickTimestamp
    this.lastTickTimestamp = now
    for (const callback of this.subscribers) {
      try {
        callback(deltaTime)
      } catch (error) {
        console.error('Error in subscriber', error)
      }
    }
  }
}

export const gameManager = GameManager.instance
