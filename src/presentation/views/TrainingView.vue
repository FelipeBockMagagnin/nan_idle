<template>
  <div class="window" style="min-height: 100%;">
    <div class="title-bar">
      <div class="title-bar-text">Training</div>
      <div class="title-bar-controls"></div>
    </div>
    <div class="window-body">

    <div class="header-container">
      <div :class="['battery-container', { 'is-charging': energyStore.energy.max.greaterThan(energyStore.energy.current) }]">
        <div
          class="battery-fill"
          :style="{
            width: formatDecimal(energyStore.energy.getAvailableEnergyPercent()) + '%'
          }"
        ></div>
        <div class="battery-glass"></div>
        <div class="battery-text">
          <div class="energy-status-row">
            <span class="energy-text">
              {{ formatDecimal(energyStore.energy.getAvailableEnergy()) }} / {{ formatDecimal(energyStore.energy.current) }}
            </span>
            <span v-if="energyStore.energy.max.greaterThan(energyStore.energy.current)" class="charging-indicator">
              (+{{ formatDecimal(energyStore.energy.power) }}/s)
            </span>
          </div>
        </div>
      </div>
    </div>

    <div class="stats-panel">
      <AttackIndicator class="stat-half" />
      <DefenceIndicator class="stat-half" />
    </div>

    <template v-for="skill in trainingStore.training" :key="skill.id">
      <TrainingSkill
        :skill="skill"
        :allocateTrainingEnergy="trainingStore.allocateTrainingEnergy"
        :reclaimTrainingEnergy="trainingStore.reclaimEnergy"
        :energyAllocationValue="energyAllocationValue"
      />
    </template>

    <div style="bottom: 70px; left: 0; position: absolute; padding: 10px">
      Theme Chooser (test)
      <br />
      <select v-model="mainStore.theme">
        <option :value="ThemeOptionEnum.Windows98">Windows 98</option>
        <option :value="ThemeOptionEnum.WindowsXP">Windows XP</option>
        <option :value="ThemeOptionEnum.Windows7">Windows 7</option>
      </select>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
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

const trainingStore = useTrainingStore()
const mainStore = useMainStore()
const energyStore = useEnergyStore()
const energyAllocationValue = ref<Decimal>(new Decimal(250))
</script>

<style scoped>
.header-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8px;
}

.battery-container {
  position: relative;
  width: 320px;
  height: 60px;
  background: linear-gradient(to bottom, #4a4a4a, #1a1a1a);
  border-radius: 6px;
  border: 2px solid #666;
  box-shadow: inset 2px 2px 8px rgba(0, 0, 0, 0.9), 0px 2px 4px rgba(0, 0, 0, 0.3);
  padding: 2px;
}

/* The battery "nipple" on the right */
.battery-container::after {
  content: '';
  position: absolute;
  right: -14px;
  top: 14px;
  width: 10px;
  height: 28px;
  background: linear-gradient(to bottom, #777, #333);
  border-radius: 0 4px 4px 0;
  border: 2px solid #555;
  border-left: none;
  box-shadow: -1px 0 2px rgba(0, 0, 0, 0.5);
}

.battery-fill {
  height: 100%;
  width: 0%;
  background: linear-gradient(to bottom, #7fff00, #32cd32, #006400);
  box-shadow: 0 0 12px rgba(50, 205, 50, 0.8);
  border-radius: 3px;
  transition: width 0.2s ease-in-out;
  position: relative;
  overflow: hidden;
}

/* Charging Stripes Animation */
.is-charging .battery-fill::after {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0; bottom: 0;
  background: repeating-linear-gradient(
    45deg,
    rgba(255, 255, 255, 0.2),
    rgba(255, 255, 255, 0.2) 15px,
    transparent 15px,
    transparent 30px
  );
  background-size: 42px 42px;
  animation: charging-stripes 1s linear infinite;
}

@keyframes charging-stripes {
  0% { background-position: 0 0; }
  100% { background-position: 42px 0; }
}

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

.stats-panel {
  display: flex;
  margin: 0 auto 12px auto;
  width: 320px;
}

.stat-half {
  padding: 8px;
  margin-left: 1px;
}

.battery-text {
  position: absolute;
  width: 100%;
  text-align: center;
  top: 50%;
  transform: translateY(-50%);
  color: #fff;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.8), -1px -1px 2px rgba(0, 0, 0, 0.4);
  font-family: Arial, sans-serif;
  font-weight: 800;
  font-size: 16px;
  letter-spacing: 0.5px;
  z-index: 10;
}

.energy-status-row {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2px;
  font-size: 15px;
  font-weight: 600;
}

.bolt-icon {
  width: 18px;
  height: 18px;
  color: #cca400;
}

.pulse-bolt {
  animation: bolt-glow 1.5s infinite alternate;
}

@keyframes bolt-glow {
  0% { text-shadow: 0 0 2px #ffcc00; opacity: 0.8; }
  100% { text-shadow: 0 0 8px #ffcc00, 0 0 15px #ffd700; opacity: 1; color: #ffd700; }
}

.energy-text {
  letter-spacing: 0.5px;
  color: white;
}

.charging-indicator {
  color: #00ff00;
  font-style: italic;
  font-size: 10px;
  margin-top: -7px;
  animation: pulse-text 1s infinite alternate;
}

@keyframes pulse-text {
  0% { opacity: 0.7; }
  100% { opacity: 1; }
}
</style>
