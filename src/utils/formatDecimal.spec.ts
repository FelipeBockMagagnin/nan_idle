import { describe, it, expect } from 'vitest'
import Decimal from 'break_infinity.js'
import { formatDecimal } from './formatDecimal'

describe('formatDecimal', () => {
  describe('small numbers', () => {
    it('should display numbers under 1000 as-is', () => {
      expect(formatDecimal(new Decimal(0))).toBe('0')
      expect(formatDecimal(new Decimal(1))).toBe('1')
      expect(formatDecimal(new Decimal(999))).toBe('999')
    })
  })

  describe('thousands', () => {
    it('should format thousands', () => {
      expect(formatDecimal(new Decimal(1000))).toBe('1 Thousand')
      expect(formatDecimal(new Decimal(1500))).toBe('1.5 Thousand')
      expect(formatDecimal(new Decimal(999999))).toBe('1000 Thousand')
    })
  })

  describe('millions', () => {
    it('should format millions', () => {
      expect(formatDecimal(new Decimal(1e6))).toBe('1 Million')
      expect(formatDecimal(new Decimal(2.5e6))).toBe('2.5 Million')
      expect(formatDecimal(new Decimal(123456789))).toBe('123.46 Million')
    })
  })

  describe('billions', () => {
    it('should format billions', () => {
      expect(formatDecimal(new Decimal(1e9))).toBe('1 Billion')
      expect(formatDecimal(new Decimal(7.89e9))).toBe('7.89 Billion')
    })
  })

  describe('trillions', () => {
    it('should format trillions', () => {
      expect(formatDecimal(new Decimal(1e12))).toBe('1 Trillion')
      expect(formatDecimal(new Decimal(5.55e12))).toBe('5.55 Trillion')
    })
  })

  describe('standard latin names', () => {
    it('should format quadrillions', () => {
      expect(formatDecimal(new Decimal(1e15))).toBe('1 Quadrillion')
    })

    it('should format quintillions', () => {
      expect(formatDecimal(new Decimal(1e18))).toBe('1 Quintillion')
    })

    it('should format sextillions', () => {
      expect(formatDecimal(new Decimal(1e21))).toBe('1 Sextillion')
    })

    it('should format septillions', () => {
      expect(formatDecimal(new Decimal(1e24))).toBe('1 Septillion')
    })

    it('should format octillions', () => {
      expect(formatDecimal(new Decimal(1e27))).toBe('1 Octillion')
    })

    it('should format nonillions', () => {
      expect(formatDecimal(new Decimal(1e30))).toBe('1 Nonillion')
    })

    it('should format decillions', () => {
      expect(formatDecimal(new Decimal(1e33))).toBe('1 Decillion')
    })

    it('should format undecillions', () => {
      expect(formatDecimal(new Decimal(1e36))).toBe('1 Undecillion')
    })

    it('should format duodecillions', () => {
      expect(formatDecimal(new Decimal(1e39))).toBe('1 Duodecillion')
    })

    it('should format tredecillions', () => {
      expect(formatDecimal(new Decimal(1e42))).toBe('1 Tredecillion')
    })

    it('should format vigintillion', () => {
      expect(formatDecimal(new Decimal(1e63))).toBe('1 Vigintillion')
    })

    it('should format trigintillion', () => {
      expect(formatDecimal(new Decimal(1e93))).toBe('1 Trigintillion')
    })

    it('should format duotrigintillion', () => {
      expect(formatDecimal(new Decimal(1e99))).toBe('1 Duotrigintillion')
    })
  })

  describe('beyond duotrigintillion', () => {
    it('should use scientific notation after duotrigintillion', () => {
      expect(formatDecimal(new Decimal('1e102'))).toBe('1e102')
      expect(formatDecimal(new Decimal('1e500'))).toBe('1e500')
      expect(formatDecimal(new Decimal('1e1000'))).toBe('1e1000')
    })

    it('should format extremely large numbers in scientific notation', () => {
      expect(formatDecimal(new Decimal('1.5e9000'))).toBe('1.5e9000')
    })
  })

  describe('custom decimal places', () => {
    it('should respect custom decimal places', () => {
      expect(formatDecimal(new Decimal(1234567), 1)).toBe('1.2 Million')
      expect(formatDecimal(new Decimal(1234567), 3)).toBe('1.235 Million')
      expect(formatDecimal(new Decimal(1234567), 0)).toBe('1 Million')
    })
  })
})
