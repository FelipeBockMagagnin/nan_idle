<template>
  <IndicatorCard
    name="Energy"
    :value="energyStore.getAvailableEnergy()"
    :max="energyStore.energy.current"
    :icon="Icons.Energy"
  />
</template>

<script setup lang="ts">
import { useEnergyStore } from '@/stores/energyStore'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { Icons } from '@/enums'

const energyStore = useEnergyStore()
</script>

<style scoped></style>
s
