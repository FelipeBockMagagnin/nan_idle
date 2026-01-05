<template>
  <IndicatorCard
    name="Attack"
    :value="playerStore.stats.attack"
    :icon="Icons.Sword"
  />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { Icons } from '@/enums'

const playerStore = usePlayerStore()
</script>

<style scoped></style>
