<template>
  <div>
    <h1>Training</h1>

    <EnergyBar />

    <br />
    <br />
    Regular Attack
    <br />
    {{ playerStore.stats.attack }} energy
    <br />
    <button @click="increaseRegularAttackEnergy">+</button>
    <button @click="decreaseRegularAttackEnergy">-</button>

    <br />
    <br />
    Block Defence
    <br />
    {{ playerStore.stats.defence }} energy
    <br />
    <button @click="increaseBlockDefenceEnergy">+</button>
    <button @click="decreaseBlockDefenceEnergy">-</button>
  </div>
</template>

<script setup lang="ts">
import EnergyBar from '@/components/EnergyBar.vue'

import { useEnergyStore } from '@/stores/energyStore'
import { usePlayerStore } from '@/stores/playerStore'

const energyStore = useEnergyStore()
const playerStore = usePlayerStore()

function increaseRegularAttackEnergy(): void {
  if (energyStore.allocateEnergy(1)) {
    playerStore.trainAttackStat(1)
  }
}

function decreaseRegularAttackEnergy(): void {
  if (energyStore.reclaimEnergy(1)) {
    playerStore.trainAttackStat(-1)
  }
}

function increaseBlockDefenceEnergy(): void {
  if (energyStore.allocateEnergy(1)) {
    playerStore.trainDefenceStat(1)
  }
}

function decreaseBlockDefenceEnergy(): void {
  if (energyStore.reclaimEnergy(1)) {
    playerStore.trainDefenceStat(-1)
  }
}
</script>

<style scoped></style>
