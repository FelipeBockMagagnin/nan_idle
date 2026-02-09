<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">Training</div>
      <div class="title-bar-controls"></div>
    </div>

    <div
      class="status-bar"
      style="display: flex; padding: 0px 10px; margin-bottom: 10px"
    >
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

    <div style="bottom: 70px; right: 0; position: absolute">
      Theme Chooser (test)
      <br />
      <select v-model="mainStore.theme">
        <option :value="ThemeOptionEnum.Windows98">Windows 98</option>
        <option :value="ThemeOptionEnum.WindowsXP">Windows XP</option>
        <option :value="ThemeOptionEnum.Windows7">Windows 7</option>
      </select>
    </div>
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
import { useMainStore } from '../stores/mainStore'
import { ThemeOptionEnum } from '@/domain/enums'

const trainingStore = useTrainingStore()
const mainStore = useMainStore()
const energyAllocationValue = ref<Decimal>(new Decimal(250))

function setEnergyAllocationValue(value: number) {
  energyAllocationValue.value = new Decimal(value)
}
</script>

<style scoped></style>
