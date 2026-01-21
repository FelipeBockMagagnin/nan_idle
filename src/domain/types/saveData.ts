export type TrainingSaveData = TrainingSkillSaveData[]

export type TrainingSkillSaveData = {
  level: string
  allocatedEnergy: string
  progress: string
}

export interface PlayerStatsData {
  attack: string
  defence: string
  hpRegen: string
  maxHP: string
}

export interface PlayerSaveData {
  stats?: PlayerStatsData
}

export interface EnergySaveData {
  current: string
  allocated: string
  max: string
}

export interface GlobalSaveData {
  meta: {
    version: number
    lastLoginTimestamp: number
  }
  player: PlayerSaveData
  training: TrainingSaveData
  energy: EnergySaveData,
  currentBossIndex: number
}
