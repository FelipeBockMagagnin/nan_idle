<template>
  <div class="window training-card" @click="showAlertIfLocked()">
    <div class="card-left">
      <div class="skill-image-box">
        <span v-if="!props.skill.unlocked"><v-icon :name="Icons.Lock" /></span>
        <span v-else>Skill<br>image</span>
      </div>
    </div>

    <div class="card-right">
      <div class="skill-header">
        <span class="skill-name">{{ props.skill.name }}</span>
        <span class="skill-level" v-if="props.skill.unlocked">lvl {{ formatDecimal(props.skill.level) }}</span>
      </div>

      <TimerIndicator
        :progress="props.skill.getskillProgressPercent()"
        width="100%"
        :locked="!props.skill.unlocked"
        :barColor="
          props.skill.skillType === SkillType.Attack ? '#8b0000' : '#00008b'
        "
      />
      
      <div class="slider-row" v-if="props.skill.unlocked">
        <input
          class="energy-slider"
          type="range"
          min="0"
          :max="maxAllocatableEnergy"
          v-model="allocatedEnergy"
          @change="changeSkillAllocatedEnergy(skill, $event)"
        />
        <div class="slider-value-badge">
          <v-icon :name="Icons.Energy" class="bolt-icon" />
          {{ allocatedEnergy }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Skill } from '@/domain/entities/Skill'
import { formatDecimal } from '../utils/formatDecimal'
import Decimal from 'break_infinity.js'
import TimerIndicator from '@/presentation/components/indicators/TimerIndicator.vue'
import { SkillType, TrainingSkillsEnum, Icons } from '@/domain/enums'
import { AlertTypeEnum, showAlert } from '@/application/services/AlertService'
import { useEnergyStore } from '../stores/energyStore'
import { ref, computed } from 'vue'

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

const maxAllocatableEnergy = computed(() => {
  return energyStore.energy
    .getAvailableEnergy()
    .plus(props.skill.allocatedEnergy)
    .toNumber()
})

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
.training-card {
  display: flex;
  padding: 6px;
  margin: 0 auto 6px auto;
  max-width: 400px;
  align-items: center;
}

.card-left {
  margin-right: 10px;
  flex-shrink: 0;
}

.skill-image-box {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-size: 10px;
  color: #333;
  background-color: #c0c0c0;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.card-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: space-between;
}

.skill-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 2px;
}

.skill-name {
  font-weight: bold;
  font-size: 13px;
  color: #222;
}

.skill-level {
  font-weight: normal;
  font-size: 12px;
  color: #222;
}

.slider-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 4px;
  gap: 8px;
}

.energy-slider {
  flex-grow: 1;
  margin: 0;
}

.slider-value-badge {
  display: flex;
  align-items: center;
  font-size: 12px;
  font-weight: bold;
  min-width: 40px;
  justify-content: flex-end;
  color: #222;
}

.bolt-icon {
  width: 16px;
  height: 16px;
  color: #cca400; /* Purple/gold just depending on theme, standard is gold */
  margin-right: 4px;
}
</style>
