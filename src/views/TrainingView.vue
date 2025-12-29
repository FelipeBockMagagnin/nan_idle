<template>
  <div>
    <h2 class="page-title">Training</h2>

    <EnergyIndicator />
    <AttackIndicator />
    <DefenceIndicator />

    <br />
    <br />
    Regular Attack
    <br />
    {{ formatDecimal(playerStore.stats.attack) }} energy
    <br />
    <button @click="increaseRegularAttackEnergy">+</button>
    <button @click="decreaseRegularAttackEnergy">-</button>

    <br />
    <br />
    Block Defence
    <br />
    {{ formatDecimal(playerStore.stats.defence) }} energy
    <br />
    <button @click="increaseBlockDefenceEnergy">+</button>
    <button @click="decreaseBlockDefenceEnergy">-</button>
  </div>
</template>

<script setup lang="ts">
import EnergyIndicator from '@/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/components/indicators/DefenceIndicator.vue'

import Decimal from 'break_infinity.js'

import { useEnergyStore } from '@/stores/energyStore'
import { usePlayerStore } from '@/stores/playerStore'
import { formatDecimal } from '@/utils/formatDecimal'

const energyStore = useEnergyStore()
const playerStore = usePlayerStore()

function increaseRegularAttackEnergy(): void {
  if (energyStore.allocateEnergy(new Decimal(1))) {
    playerStore.trainAttackStat(new Decimal(1))
  }
}

function decreaseRegularAttackEnergy(): void {
  if (energyStore.reclaimEnergy(new Decimal(1))) {
    playerStore.trainAttackStat(new Decimal(-1))
  }
}

function increaseBlockDefenceEnergy(): void {
  if (energyStore.allocateEnergy(new Decimal(1))) {
    playerStore.trainDefenceStat(new Decimal(1))
  }
}

function decreaseBlockDefenceEnergy(): void {
  if (energyStore.reclaimEnergy(new Decimal(1))) {
    playerStore.trainDefenceStat(new Decimal(-1))
  }
}
</script>

<style scoped></style>
