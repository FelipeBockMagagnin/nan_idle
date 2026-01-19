import Decimal from 'break_infinity.js'

export class Energy {
  constructor(
    public current: Decimal,
    public allocated: Decimal,
    public max: Decimal,
    public regenerationRate: Decimal,
    public power: Decimal
  ) {}

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

    this.current = this.current.plus(this.regenerationRate.multiply(deltaTime))
  }

  reclaimEnergy(value: Decimal): boolean {
    if (value.greaterThan(this.allocated)) {
      return false
    }

    if (this.allocated.subtract(value).lessThan(new Decimal(0))) {
      return false
    }

    this.allocated = this.allocated.subtract(value)
    return true
  }

  getEnergyRegenProgress(): number {
    return this.current
      .minus(Math.floor(this.current.toNumber()))
      .times(100)
      .toNumber()
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
