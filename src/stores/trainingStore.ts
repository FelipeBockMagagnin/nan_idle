import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Training, TrainingTrait } from '@/types'
import { TrainingSkills } from '@/enums'
import Decimal from 'break_infinity.js'

function getInitialTrainingState(): Training {
  const training: Training = {}
  for (const skill in TrainingSkills) {
    training[skill as keyof typeof TrainingSkills] = {
      allocatedEnergy: new Decimal(0),
      level: new Decimal(0),
      progress: new Decimal(0),
      trainingSpeed: new Decimal(1),
    }
  }
  return training
}

export const useTrainingStore = defineStore(
  'training',
  () => {
    const training = ref<Training>(getInitialTrainingState())

    function allocateTrainingEnergy(
      skill: TrainingSkills,
      value: Decimal
    ): boolean {
      const skillName = TrainingSkills[skill] as keyof typeof TrainingSkills
      if (
        training.value[skillName].allocatedEnergy
          .add(value)
          .lessThan(new Decimal(0))
      ) {
        return false
      }

      training.value[skillName].allocatedEnergy =
        training.value[skillName].allocatedEnergy.add(value)

      return true
    }

    function getAllocatedEnergyValue(skill: TrainingSkills): Decimal {
      const skillName = TrainingSkills[skill] as keyof typeof TrainingSkills
      return training.value[skillName].allocatedEnergy
    }

    function increaseSkillLevel(skill: TrainingSkills, value: Decimal): void {
      const skillName = TrainingSkills[skill] as keyof typeof TrainingSkills
      training.value[skillName].level =
        training.value[skillName].level.plus(value)
    }

    function getLevelValue(skill: TrainingSkills): Decimal {
      const skillName = TrainingSkills[skill] as keyof typeof TrainingSkills
      return training.value[skillName].level
    }

    function updateSkillProgress(skill: TrainingSkills, value: Decimal): void {
      const skillName = TrainingSkills[skill] as keyof typeof TrainingSkills
      training.value[skillName].progress = value
    }

    return {
      training,
      allocateTrainingEnergy,
      increaseSkillLevel,
      updateSkillProgress,
      getAllocatedEnergyValue,
      getLevelValue,
    }
  },
  {
    persist: {
      serializer: {
        serialize: (state) => {
          const serializedTraining: Record<string, TrainingTrait> = {}
          for (const skill in state.training) {
            serializedTraining[skill] = {
              allocatedEnergy: state.training[skill].allocatedEnergy.toString(),
              level: state.training[skill].level.toString(),
              progress: state.training[skill].progress.toString(),
              trainingSpeed: state.training[skill].trainingSpeed.toString(),
            }
          }
          return JSON.stringify({ training: serializedTraining })
        },
        deserialize: (str) => {
          const { training } = JSON.parse(str)
          const deserializedTraining: Training = {}
          for (const skill in training) {
            deserializedTraining[skill] = {
              allocatedEnergy: new Decimal(training[skill].allocatedEnergy),
              level: new Decimal(training[skill].level),
              progress: new Decimal(training[skill].progress),
              trainingSpeed: new Decimal(training[skill].trainingSpeed),
            }
          }
          return { training: deserializedTraining }
        },
      },
    },
  }
)
