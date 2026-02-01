<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">Training</div>
      <div class="title-bar-controls">
        <div>
          <button
            :style="{
              borderWidth: energyAllocationValue.equals(100) ? '1px' : '0',
            }"
            @click="setEnergyAllocationValue(100)"
          >
            100
          </button>
          <button
            :style="{
              borderWidth: energyAllocationValue.equals(250) ? '1px' : '0',
            }"
            @click="setEnergyAllocationValue(250)"
          >
            250
          </button>
        </div>
      </div>
    </div>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    <template v-for="skill in trainingStore.training" :key="skill.id">
      <TrainingSkill
        :skill="skill"
        :allocateTrainingEnergy="trainingStore.allocateTrainingEnergy"
        :reclaimTrainingEnergy="trainingStore.reclaimEnergy"
        :energyAllocationValue="energyAllocationValue"
      />
    </template>
  </div>
</template>

<script setup lang="ts">
import EnergyIndicator from '@/presentation/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import { useTrainingStore } from '@/presentation/stores/trainingStore'
import Decimal from 'break_infinity.js'
import { ref } from 'vue'
import TrainingSkill from '../components/TrainingSkill.vue'

const trainingStore = useTrainingStore()
const energyAllocationValue = ref<Decimal>(new Decimal(250))

function setEnergyAllocationValue(value: number) {
  energyAllocationValue.value = new Decimal(value)
}
</script>

<style scoped></style>
