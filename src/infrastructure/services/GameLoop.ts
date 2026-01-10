export class GameLoop {
  private static _instance: GameLoop

  private lastTime: number = 0
  private subscribers: ((delta: number) => void)[] = []
  private animationFrameId: number | null = null
  private isRunning: boolean = false

  private constructor() {}

  public static get instance(): GameLoop {
    if (!GameLoop._instance) {
      GameLoop._instance = new GameLoop()
    }
    return GameLoop._instance
  }

  public subscribe(callback: (delta: number) => void): void {
    this.subscribers.push(callback)
  }

  public unsubscribe(callback: (delta: number) => void): void {
    this.subscribers = this.subscribers.filter((sub) => sub !== callback)
  }

  public start(): void {
    if (this.isRunning) return

    console.log('[GameLoop] Starting...')
    this.isRunning = true
    this.lastTime = performance.now()
    this.tick(this.lastTime)
  }

  public stop(): void {
    this.isRunning = false
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId)
      this.animationFrameId = null
    }
  }

  private tick = (currentTime: number): void => {
    if (!this.isRunning) return

    // Calculate Delta in SECONDS
    const rawDelta = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    // Cap delta at 0.5s to prevent lag spikes
    const delta = Math.min(rawDelta, 0.5)

    // Notify all systems
    for (const callback of this.subscribers) {
      try {
        callback(delta)
      } catch (error) {
        console.error('System Error:', error)
      }
    }

    this.animationFrameId = requestAnimationFrame(this.tick)
  }
}

export const gameLoop = GameLoop.instance
