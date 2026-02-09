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
      <div class="field-row" style="width: 100%">
        <input
          id="range23"
          type="range"
          min="0"
          :max="
            energyStore.energy
              .getAvailableEnergy()
              .plus(skill.allocatedEnergy)
              .toNumber()
          "
          v-model="allocatedEnergy"
          @change="changeSkillAllocatedEnergy(skill, $event)"
        />
        <label for="range22">{{ allocatedEnergy }}</label>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skill } from '@/domain/entities/Skill'
import { formatDecimal } from '../utils/formatDecimal'
import Decimal from 'break_infinity.js'
import TimerIndicator from '@/presentation/components/indicators/TimerIndicator.vue'
import { SkillType, TrainingSkillsEnum } from '@/domain/enums'
import { AlertTypeEnum, showAlert } from '@/application/services/AlertService'
import { useEnergyStore } from '../stores/energyStore'
import { ref } from 'vue'

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

const energyStore = useEnergyStore()

const props = defineProps<Props>()

const allocatedEnergy = ref<number>(props.skill.allocatedEnergy.toNumber())

function changeSkillAllocatedEnergy(skill: Skill, event: Event) {
  const value = new Decimal((event.target as HTMLInputElement).value)
  const newValue = value.minus(skill.allocatedEnergy)
  if (newValue.greaterThan(0)) {
    props.allocateTrainingEnergy(skill.id, newValue.abs())
    return
  }

  props.reclaimTrainingEnergy(skill.id, newValue.abs())
}

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
