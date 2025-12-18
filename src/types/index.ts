// Player-related types
export interface PlayerStats {
  attack: number
  defence: number
}

export interface PlayerEnergy {
  current: number
  max: number
}

// Energy store types
export interface Energy {
  current: number
  allocated: number
  max: number
}

// HP-related types
export interface HP {
  current: number
  max: number
}

// Enemy types
export interface Enemy {
  hp: HP
}
