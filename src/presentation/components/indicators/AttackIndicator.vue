<template>
  <IndicatorCard
    name="Attack"
    :value="playerStore.stats.attack"
    :icon="Icons.Sword"
  />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/presentation/stores/playerStore'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons } from '@/domain/enums'

const playerStore = usePlayerStore()
</script>

<style scoped></style>
