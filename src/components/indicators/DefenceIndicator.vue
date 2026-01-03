<template>
  <IndicatorCard
    name="Defence"
    :value="playerStore.stats.defence"
    :icon="Icons.Shield"
  />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { Icons } from '@/enums';

const playerStore = usePlayerStore()
</script>

<style scoped></style>
s
