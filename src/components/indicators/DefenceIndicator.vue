<template>
  <IndicatorCard
    name="Defence"
    :value="playerStore.stats.defence"
    icon="md-shield"
  />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'

const playerStore = usePlayerStore()
</script>

<style scoped></style>
s
