<template>
  <span>Energy: </span>
  <strong>
    {{ energyStore.getAvailableEnergy() }} / {{ energyStore.energy.current }}
  </strong>
</template>

<script setup lang="ts">
import { useEnergyStore } from '@/stores/energyStore'
const energyStore = useEnergyStore()
</script>

<style scoped></style>
