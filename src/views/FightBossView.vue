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
import { usePlayerStore } from '../stores/playerStore'
import HPBar from '../components/HPBar.vue'
import EnergyBar from '../components/EnergyBar.vue'

const playerStore = usePlayerStore()

function regularAttack() {
  playerStore.changeHP(-1)
  playerStore.decreaseEnergy(1)
}
</script>

<style scoped></style>
