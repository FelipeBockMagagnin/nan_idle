<template>
  <span>HP: </span>
  <strong> {{ hpStore.hp.current }} / {{ hpStore.hp.max }} </strong>
</template>

<script setup>
import { useHPStore } from '../stores/hpStore'
const hpStore = useHPStore()
</script>

<style scoped></style>
