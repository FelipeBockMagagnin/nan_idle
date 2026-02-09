<template>
  <IndicatorCard
    name="Defence"
    :value="playerStore.stats.defence"
    :icon="Icons.Shield"
    class="status-field-border"
  />
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/presentation/stores/playerStore'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons } from '@/domain/enums'

const playerStore = usePlayerStore()
</script>

<style scoped></style>
s
