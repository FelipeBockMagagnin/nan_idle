<template>
  <IndicatorCard
    name="Energy"
    :value="energyStore.getAvailableEnergy()"
    :max="energyStore.energy.current"
    :icon="Icons.Energy"
  />
</template>

<script setup lang="ts">
import { useEnergyStore } from '@/presentation/stores/energyStore'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons } from '@/domain/enums'

const energyStore = useEnergyStore()
</script>

<style scoped></style>
s
