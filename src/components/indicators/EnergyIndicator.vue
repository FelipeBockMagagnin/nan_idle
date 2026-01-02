<template>
  <IndicatorCard
    name="Energy"
    :value="energyStore.getAvailableEnergy()"
    :max="energyStore.energy.current"
    icon="md-electricbolt"
  />
</template>

<script setup lang="ts">
import { useEnergyStore } from '@/stores/energyStore'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'

const energyStore = useEnergyStore()
</script>

<style scoped></style>
s
