import Decimal from 'break_infinity.js'

/**
 * Number suffixes for large numbers (10^3 to 10^99)
 * Each suffix represents 3 orders of magnitude
 * Index 0 = Thousand (10^3), Index 1 = Million (10^6), etc.
 */
const SUFFIXES = [
  'Thousand',             // 10^3
  'Million',              // 10^6
  'Billion',              // 10^9
  'Trillion',             // 10^12
  'Quadrillion',          // 10^15
  'Quintillion',          // 10^18
  'Sextillion',           // 10^21
  'Septillion',           // 10^24
  'Octillion',            // 10^27
  'Nonillion',            // 10^30
  'Decillion',            // 10^33
  'Undecillion',          // 10^36
  'Duodecillion',         // 10^39
  'Tredecillion',         // 10^42
  'Quattuordecillion',    // 10^45
  'Quindecillion',        // 10^48
  'Sexdecillion',         // 10^51
  'Septendecillion',      // 10^54
  'Octodecillion',        // 10^57
  'Novemdecillion',       // 10^60
  'Vigintillion',         // 10^63
  'Unvigintillion',       // 10^66
  'Duovigintillion',      // 10^69
  'Trevigintillion',      // 10^72
  'Quattuorvigintillion', // 10^75
  'Quinvigintillion',     // 10^78
  'Sexvigintillion',      // 10^81
  'Septenvigintillion',   // 10^84
  'Octovigintillion',     // 10^87
  'Novemvigintillion',    // 10^90
  'Trigintillion',        // 10^93
  'Untrigintillion',      // 10^96
  'Duotrigintillion',     // 10^99
]

const MAX_SUFFIX_EXPONENT = 101 // Up to 999.99 Duotrigintillion (10^101)

/**
 * Formats a number with fixed decimals, removing trailing zeros
 * Example: 1.50 -> "1.5", 1.00 -> "1"
 */
function formatWithDecimals(num: number, decimals: number): string {
  return num.toFixed(decimals).replace(/\.?0+$/, '')
}

/**
 * Calculates the suffix index and display value from an exponent
 * Suffixes are grouped by 3 orders of magnitude (thousand = 3, million = 6, etc.)
 */
function getSuffixInfo(exponent: number): { index: number; displayMultiplier: number } {
  const index = Math.floor(exponent / 3) - 1
  const remainingExponent = exponent % 3
  const displayMultiplier = Math.pow(10, remainingExponent)

  return { index, displayMultiplier }
}

/**
 * Formats a Decimal value into a human-readable string
 *
 * - Numbers < 1000: displayed as-is (e.g., "999")
 * - Numbers 10^3 to 10^101: displayed with suffix (e.g., "1.5 Million")
 * - Numbers > 10^101: displayed in scientific notation (e.g., "1.5e500")
 */
export function formatDecimal(value: Decimal, decimals: number = 2): string {
  const exponent = Math.floor(value.exponent)
  const mantissa = value.mantissa

  // Small numbers: display as-is
  if (exponent < 3) {
    return value.toNumber().toString()
  }

  // Very large numbers: use scientific notation
  if (exponent > MAX_SUFFIX_EXPONENT) {
    return `${formatWithDecimals(mantissa, decimals)}e${exponent}`
  }

  // Standard large numbers: use word suffix
  const { index, displayMultiplier } = getSuffixInfo(exponent)
  const displayValue = mantissa * displayMultiplier
  const suffix = SUFFIXES[index]

  return `${formatWithDecimals(displayValue, decimals)} ${suffix}`
}
