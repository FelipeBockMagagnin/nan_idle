import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { GameManager } from './gameManager'

describe('GameManager', () => {
  let gameManager: GameManager

  beforeEach(() => {
    gameManager = GameManager.instance
    vi.useFakeTimers()
  })

  afterEach(() => {
    gameManager.stop()
    vi.useRealTimers()
  })

  it('should be a singleton', () => {
    const instance1 = GameManager.instance
    const instance2 = GameManager.instance
    expect(instance1).toBe(instance2)
  })

  it('should subscribe and unsubscribe correctly', () => {
    const callback = vi.fn()
    gameManager.subscribe(callback)
    gameManager.tick()
    expect(callback).toHaveBeenCalledTimes(1)

    gameManager.unsubscribe(callback)
    gameManager.tick()
    expect(callback).toHaveBeenCalledTimes(1)
  })

  it('should call subscribers on tick', () => {
    const callback1 = vi.fn()
    const callback2 = vi.fn()
    gameManager.subscribe(callback1)
    gameManager.subscribe(callback2)

    gameManager.tick()

    expect(callback1).toHaveBeenCalledTimes(1)
    expect(callback2).toHaveBeenCalledTimes(1)
  })

  it('should pass deltaTime to subscribers', () => {
    const callback = vi.fn()
    gameManager.subscribe(callback)

    gameManager.start()
    vi.advanceTimersByTime(100)
    gameManager.tick()

    expect(callback).toHaveBeenCalledWith(expect.any(Number))
  })

  it('should start and stop the game loop', () => {
    const callback = vi.fn()
    gameManager.subscribe(callback)

    gameManager.start()
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(5)


    gameManager.stop()
    vi.advanceTimersByTime(500)
    expect(callback).toHaveBeenCalledTimes(5)
  })
})
