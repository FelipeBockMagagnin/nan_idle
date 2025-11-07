<template>
  <span>Energy: </span>
  <strong>
    {{ energyStore.getAvaliableEnergy() }} / {{ energyStore.energy.current }}
  </strong>
</template>

<script setup>
import { useEnergyStore } from '../stores/energyStore'
const energyStore = useEnergyStore()
</script>

<style scoped></style>
