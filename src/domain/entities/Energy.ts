import Decimal from 'break_infinity.js'

export type EnergyOptions = {
  current: Decimal
  allocated: Decimal
  max: Decimal
  regenerationRate: Decimal
  power: Decimal
  bars: Decimal
}

export class Energy {
  public current: Decimal
  public allocated: Decimal
  public max: Decimal
  public regenerationRate: Decimal
  public power: Decimal
  public bars: Decimal

  private regenarationProgress: number = 0

  constructor(options: EnergyOptions) {
    this.current = options.current
    this.allocated = options.allocated
    this.max = options.max
    this.regenerationRate = options.regenerationRate
    this.power = options.power
    this.bars = options.bars
  }

  get energy(): Energy {
    return this
  }

  canAllocateEnergy(value: Decimal): boolean {
    if (value.greaterThan(this.getAvailableEnergy())) {
      return false
    }

    return true
  }

  allocateEnergy(value: Decimal): boolean {
    const canAllocateEnergy = this.canAllocateEnergy(value)
    if (!canAllocateEnergy) return false

    this.allocated = this.allocated.plus(value)
    return true
  }

  getAvailableEnergy(): Decimal {
    return this.current.subtract(this.allocated)
  }

  regenerate(deltaTime: number): void {
    if (this.current.greaterThanOrEqualTo(this.max)) return

    this.regenarationProgress += this.regenerationRate
      .multiply(deltaTime)
      .toNumber()

    if (this.regenarationProgress >= 1) {
      const barsIncrease = this.bars.multiply(
        Math.floor(this.regenarationProgress)
      )
      this.current = this.current.plus(barsIncrease)
      this.regenarationProgress = 0
    }
  }

  reclaimEnergy(value: Decimal): boolean {
    if (value.greaterThan(this.allocated)) {
      return false
    }

    this.allocated = this.allocated.subtract(value)
    return true
  }

  getEnergyRegenProgress(): number {
    return this.regenarationProgress * 100
  }

  increaseCap(value: Decimal): void {
    this.max = this.max.add(value)
  }

  increaseRegenationRate(value: Decimal): void {
    this.regenerationRate = this.regenerationRate.add(value)
  }

  increasePower(value: Decimal): void {
    this.power = this.power.add(value)
  }
}
