<template>
  <div>
    <div class="title-bar">
      <div class="title-bar-text">Training</div>
      <div class="title-bar-controls"></div>
    </div>

    <div style="display: flex; flex-direction: column; align-items: center">
      <div class="battery-container">
        <div
          class="battery-fill"
          id="mainBattery"
          :style="{
            width:
              formatDecimal(energyStore.energy.getAvailableEnergyPercent()) +
              '%',
          }"
        ></div>
        <div class="battery-glass"></div>
        <div class="battery-text" id="batteryPercent">
          {{ formatDecimal(energyStore.energy.getAvailableEnergyPercent()) }}%
          FREE
        </div>
      </div>
      <TimerIndicator
        v-if="energyStore.energy.max.greaterThan(energyStore.energy.current)"
        :progress="energyStore.energy.getEnergyRegenProgress()"
        bar-color="green"
        background-color="transparent"
        :height="'10px'"
        :width="'300px'"
      />
    </div>

    <div id="energyValue" style="padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
    </div>
    <div style="display: flex; padding: 0px 10px">
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

    <div style="bottom: 70px; left: 0; position: absolute">
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
import { useEnergyStore } from '../stores/energyStore'
import { formatDecimal } from '../utils/formatDecimal'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'

const trainingStore = useTrainingStore()
const mainStore = useMainStore()
const energyStore = useEnergyStore()
const energyAllocationValue = ref<Decimal>(new Decimal(250))
</script>

<style scoped>
.battery-container {
  position: relative;
  width: 300px;
  height: 60px;
  background: linear-gradient(to bottom, #555, #222);
  border-radius: 4px;
  border: 2px solid #888;
  box-shadow: inset 2px 2px 5px rgba(0, 0, 0, 0.8);
  margin-left: auto;
  margin-right: auto;
  margin-top: 10px;
  padding: 3px;
  display: flex;
  align-items: center;
}

/* The battery "nipple" on the right */
.battery-container::after {
  content: '';
  position: absolute;
  right: -12px;
  top: 15px;
  width: 8px;
  height: 24px;
  background: #444;
  border-radius: 0 4px 4px 0;
  box-shadow: -1px 0 2px rgba(0, 0, 0, 0.5);
}

.battery-fill {
  height: 100%;
  width: 30%; /* Starts at 0 */
  background: linear-gradient(to bottom, #7fff00, #32cd32, #006400);
  box-shadow: 0 0 10px #32cd32;
  border-radius: 2px;
  transition: width 0.1s linear;
  position: relative;
}

.battery-fill {
  height: 100%;
  width: 30%; /* Starts at 0 */
  background: linear-gradient(to bottom, #7fff00, #32cd32, #006400);
  box-shadow: 0 0 10px #32cd32;
  border-radius: 2px;
  transition: width 0.1s linear;
  position: relative;
}

/* Glassy reflection effect */
.battery-glass {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 45%;
  background: linear-gradient(
    to bottom,
    rgba(255, 255, 255, 0.4),
    rgba(255, 255, 255, 0.05)
  );
  border-radius: 2px 2px 0 0;
  pointer-events: none;
}

.battery-text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  color: white;
  text-shadow: 1px 1px 2px black;
  font-weight: bold;
  font-size: 14px;
  z-index: 10;
}
</style>
