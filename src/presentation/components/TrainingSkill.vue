<template>
  <br />

  {{ props.skill.name }}

  <div class="training-item-container" @click="showAlertIfLocked()">
    <TimerIndicator
      :progress="props.skill.getskillProgressPercent()"
      width="200px"
      :locked="!props.skill.unlocked"
      :innerText="formatDecimal(props.skill.level)"
      :barColor="
        props.skill.skillType === SkillType.Attack ? '#be3636' : '#3e3eb5'
      "
    />
    <div v-if="props.skill.unlocked">
      <button
        @click="allocateTrainingEnergy(props.skill.id, energyAllocationValue)"
      >
        +
      </button>
      <span>{{ formatDecimal(props.skill.allocatedEnergy) }}</span>
      <button
        @click="reclaimTrainingEnergy(props.skill.id, energyAllocationValue)"
      >
        -
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Skill } from '@/domain/entities/Skill'
import { formatDecimal } from '../utils/formatDecimal'
import Decimal from 'break_infinity.js'
import TimerIndicator from '@/presentation/components/indicators/TimerIndicator.vue'
import { SkillType, TrainingSkillsEnum } from '@/domain/enums'
import { AlertTypeEnum, showAlert } from '@/application/services/AlertService'

type AllocateTrainingEnergyCallback = (
  skill: TrainingSkillsEnum,
  value: Decimal
) => boolean

type ReclaimTrainingEnergyCallback = (
  skill: TrainingSkillsEnum,
  value: Decimal
) => boolean

interface Props {
  skill: Skill
  energyAllocationValue: Decimal
  allocateTrainingEnergy: AllocateTrainingEnergyCallback
  reclaimTrainingEnergy: ReclaimTrainingEnergyCallback
}

const props = defineProps<Props>()

function showAlertIfLocked() {
  if (!props.skill.unlocked) {
    showAlert('Requires Level 5000 in previous skill.', AlertTypeEnum.Error)
  }
}
</script>

<style scoped>
.training-item-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
