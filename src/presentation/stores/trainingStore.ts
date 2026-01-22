import { defineStore } from 'pinia'
import { TrainingSkillsEnum } from '@/domain/enums'
import type { TrainingSaveData } from '@/domain/types/saveData'
import Decimal from 'break_infinity.js'
import { container } from '@/infrastructure/container'

export const useTrainingStore = defineStore('training', () => {
  const { trainingRepo, allocateEnergyUseCase, reclaimEnergyUseCase } =
    container

  const training = trainingRepo.getSkills()

  function getSkill(skill: TrainingSkillsEnum) {
    return training.find((s) => s.id === skill)
  }

  function allocateTrainingEnergy(
    skill: TrainingSkillsEnum,
    value: Decimal
  ): boolean {
    const success = allocateEnergyUseCase.execute(skill, value)
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
    return trainingRepo.exportData()
  }

  function importSaveData(data: TrainingSaveData) {
    trainingRepo.importData(data)
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
