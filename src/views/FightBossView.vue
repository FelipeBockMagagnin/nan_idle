<template>
  <div>
    <h1>Fight Boss</h1>

    <EnergyBar />
    <br />
    <HPBar />

    <br /><br />

    <button @click="regularAttack">Regular Attack</button>
  </div>
</template>

<script setup>
import { useEnergyStore } from '../stores/energyStore'
import { useHPStore } from '../stores/hpStore'

import HPBar from '../components/HPBar.vue'
import EnergyBar from '../components/EnergyBar.vue'

const hpStore = useHPStore()
const energyStore = useEnergyStore()

function regularAttack() {
  hpStore.changeHP(-1)
  energyStore.decreaseEnergy(1)
}
</script>

<style scoped></style>
