<template>
  <div style="width: 100%; position: relative">
    <IndicatorCard
      name="Energy"
      :value="energyStore.getAvailableEnergy()"
      :max="energyStore.energy.current"
      :icon="Icons.Energy"
    />
    <TimerIndicator
      v-if="energyStore.energy.max.greaterThan(energyStore.energy.current)"
      style="position: absolute; top: 0; z-index: -1; border-radius: 0"
      :progress="energyStore.energy.getEnergyRegenProgress()"
      bar-color="green"
      background-color="transparent"
    />
  </div>
</template>

<script setup lang="ts">
import { useEnergyStore } from '@/presentation/stores/energyStore'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons } from '@/domain/enums'
import TimerIndicator from './TimerIndicator.vue'

const energyStore = useEnergyStore()
</script>

<style scoped></style>
