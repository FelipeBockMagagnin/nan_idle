import { defineStore } from 'pinia'
import { ref, triggerRef } from 'vue'
import { gameLoop } from '@/infrastructure/services/GameLoop'
import { TrainingSkillsEnum } from '@/domain/enums'
import type { TrainingSaveData } from '@/domain/entities/saveData'
import Decimal from 'break_infinity.js'
import { TrainingRepository } from '@/infrastructure/repositories/TrainingRepository'
import { PlayerRepository } from '@/infrastructure/repositories/PlayerRepository'
import { TickTrainingUseCase } from '@/application/use-cases/training/TickTrainingUseCase'
import { AllocateEnergyUseCase } from '@/application/use-cases/training/AllocateEnergyUseCase'
import { EnergyRepository } from '@/infrastructure/repositories/EnergyRepository'
import { ReclaimEnergyUseCase } from '@/application/use-cases/training/ReclaimEnergyUseCase'

export const useTrainingStore = defineStore('training', () => {
  const repository = new TrainingRepository()
  const playerRepository = new PlayerRepository()
  const energyRepository = new EnergyRepository()

  const tickUseCase = new TickTrainingUseCase(repository, playerRepository)

  const allocateUseCase = new AllocateEnergyUseCase(
    repository,
    energyRepository
  )
  const reclaimEnergyUseCase = new ReclaimEnergyUseCase(
    repository,
    energyRepository
  )

  const training = ref(repository.getSkills())

  gameLoop.subscribe((delta) => {
    tickUseCase.execute(delta)
    triggerRef(training)
  })

  function getSkill(skill: TrainingSkillsEnum) {
    return training.value.find((s) => s.id === skill)
  }

  function allocateTrainingEnergy(
    skill: TrainingSkillsEnum,
    value: Decimal
  ): boolean {
    const success = allocateUseCase.execute(skill, value)
    return success
  }

  function reclaimEnergy(skill: TrainingSkillsEnum, value: Decimal) {
    return reclaimEnergyUseCase.execute(skill, value)
  }

  function getAllocatedEnergyValue(skill: TrainingSkillsEnum): Decimal {
    const skillData = getSkill(skill)
    if (!skillData) return new Decimal(0)
    return skillData.allocatedEnergy
  }

  function getLevelValue(skill: TrainingSkillsEnum): Decimal {
    const skillData = getSkill(skill)

    if (!skillData) return new Decimal(0)

    return skillData.level
  }

  function exportSaveData(): TrainingSaveData {
    return repository.exportData()
  }

  function importSaveData(data: TrainingSaveData) {
    repository.importData(data)
  }

  function getskillProgressPercent(skill: TrainingSkillsEnum): number {
    const skillData = getSkill(skill)
    if (!skillData) return 0
    return skillData.progress
      .multiply(100)
      .divide(skillData.baseEnergyCost)
      .toNumber()
  }

  return {
    training,
    allocateTrainingEnergy,
    reclaimEnergy,
    getAllocatedEnergyValue,
    getLevelValue,
    getSkill,
    exportSaveData,
    importSaveData,
    getskillProgressPercent,
  }
})
