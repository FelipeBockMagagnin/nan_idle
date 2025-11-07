<template>
  <div>
    <h1>Training</h1>

    <EnergyBar />
  </div>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore'
import EnergyBar from '../components/EnergyBar.vue'

const playerStore = usePlayerStore()
</script>

<style scoped></style>
