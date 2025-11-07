<template>
  <span>Energy: </span>
  <strong>
    {{ playerStore.energy.current }} / {{ playerStore.energy.max }}
  </strong>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore'
const playerStore = usePlayerStore()
</script>

<style scoped></style>
