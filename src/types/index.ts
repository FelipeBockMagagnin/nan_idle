import Decimal from 'break_infinity.js'

// Player-related types
export interface PlayerStats {
  attack: Decimal
  defence: Decimal
}

// Energy store types
export interface Energy {
  current: Decimal
  allocated: Decimal
  max: Decimal
}

// HP-related types
export interface HP {
  current: Decimal
  max: Decimal
}

// Enemy types
export interface Enemy {
  hp: HP
}
