import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Training, TrainingTrait } from '@/types'
import { TrainingSkills, SkillType } from '@/enums'
import Decimal from 'break_infinity.js'
import { gameManager } from '@/services/gameManager'
import { usePlayerStore } from '@/stores/playerStore'

function getInitialTrainingState(): Training {
  return {
    [TrainingSkills.RegularAttack]: {
      allocatedEnergy: new Decimal(0),
      level: new Decimal(0),
      progress: new Decimal(0),
      trainingSpeed: new Decimal(1),
      trainingDificulty: new Decimal(10),
      trainingDificultyIncrease: new Decimal(1.2),
      skillType: SkillType.Attack,
      skillStatIncreaseValue: new Decimal(1),
    },
    [TrainingSkills.BlockDefence]: {
      allocatedEnergy: new Decimal(0),
      level: new Decimal(0),
      progress: new Decimal(0),
      trainingSpeed: new Decimal(1.2),
      trainingDificulty: new Decimal(10),
      trainingDificultyIncrease: new Decimal(1.2),
      skillType: SkillType.Defence,
      skillStatIncreaseValue: new Decimal(1),
    },
  }
}

export const useTrainingStore = defineStore(
  'training',
  () => {
    const training = ref<Training>(getInitialTrainingState())

    const onGameTick = (deltaTime: number) => {
      updateSkillsProgress(deltaTime)
    }

    gameManager.subscribe(onGameTick)

    function getSkill(skill: TrainingSkills): TrainingTrait {
      return training.value[skill]
    }

    function allocateTrainingEnergy(
      skill: TrainingSkills,
      value: Decimal
    ): boolean {
      const skillData = getSkill(skill)
      if (skillData.allocatedEnergy.add(value).lessThan(new Decimal(0))) {
        return false
      }

      skillData.allocatedEnergy = skillData.allocatedEnergy.add(value)

      return true
    }

    function getAllocatedEnergyValue(skill: TrainingSkills): Decimal {
      return getSkill(skill).allocatedEnergy
    }

    function increaseSkillLevel(skill: TrainingSkills, value: Decimal): void {
      const skillData = getSkill(skill)
      skillData.level = skillData.level.plus(value)
    }

    function getLevelValue(skill: TrainingSkills): Decimal {
      return getSkill(skill).level
    }

    function getskillProgressPercent(skill: TrainingSkills): number {
      const skillData = getSkill(skill)
      return skillData.progress
        .multiply(100)
        .divide(skillData.trainingDificulty)
        .toNumber()
    }

    function updateSkillsProgress(deltaTime: number): void {
      for (const skillName of Object.keys(
        training.value
      ) as (keyof Training)[]) {
        const skillData = training.value[skillName]

        if (skillData.allocatedEnergy.lessThanOrEqualTo(new Decimal(0))) {
          continue
        }

        const increase = new Decimal(deltaTime)
          .multiply(skillData.allocatedEnergy)
          .divide(1000)

        let totalProgress = skillData.progress.add(increase)
        if (totalProgress.greaterThanOrEqualTo(skillData.trainingDificulty)) {
          const levelsGained = totalProgress
            .divide(skillData.trainingDificulty)
            .floor()

          skillData.level = skillData.level.add(levelsGained)

          totalProgress = totalProgress.minus(
            levelsGained.multiply(skillData.trainingDificulty)
          )

          const playerStore = usePlayerStore()

          switch (skillData.skillType) {
            case SkillType.Attack:
              playerStore.trainAttackStat(
                levelsGained.multiply(skillData.skillStatIncreaseValue)
              )
              break
            case SkillType.Defence:
              playerStore.trainDefenceStat(
                levelsGained.multiply(skillData.skillStatIncreaseValue)
              )
          }

          skillData.trainingDificulty = skillData.trainingDificulty.multiply(
            skillData.trainingDificultyIncrease
          )
        }

        skillData.progress = totalProgress
      }
    }

    return {
      training,
      allocateTrainingEnergy,
      increaseSkillLevel,
      getAllocatedEnergyValue,
      getLevelValue,
      getskillProgressPercent,
      updateSkillsProgress,
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
              trainingDificulty:
                state.training[skill].trainingDificulty.toString(),
              trainingDificultyIncrease:
                state.training[skill].trainingDificultyIncrease.toString(),
              skillStatIncreaseValue:
                state.training[skill].skillStatIncreaseValue.toString(),
              skillType: state.training[skill].skillType.toString(),
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
              trainingDificulty: new Decimal(training[skill].trainingDificulty),
              trainingDificultyIncrease: new Decimal(
                training[skill].trainingDificultyIncrease
              ),
              skillStatIncreaseValue: new Decimal(
                training[skill].skillStatIncreaseValue
              ),
              skillType: training[skill].skillStatIncreaseValue,
            }
          }
          return { training: deserializedTraining }
        },
      },
    },
  }
)
