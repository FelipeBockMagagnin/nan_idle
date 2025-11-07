<template>
  <span>Energy: </span>
  <strong>
    {{ energyStore.energy.current }} / {{ energyStore.energy.max }}
  </strong>
</template>

<script setup>
import { useEnergyStore } from '../stores/energyStore'
const energyStore = useEnergyStore()
</script>

<style scoped></style>
