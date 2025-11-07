<template>
  <span>HP: </span>
  <strong> {{ playerStore.hp.current }} / {{ playerStore.hp.max }} </strong>
</template>

<script setup>
import { usePlayerStore } from '../stores/playerStore'
const playerStore = usePlayerStore()
</script>

<style scoped></style>
