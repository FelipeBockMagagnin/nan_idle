<template>
  <div>
    <h1>Training</h1>

    <EnergyBar />

    <br />
    <br />
    Regular Attack
    <br />
    {{ regularAttackEnergy }} energy
    <br />
    <button @click="increaseRegularAttackEnergy">+</button>
    <button @click="decreaseRegularAttackEnergy">-</button>

    <br />
    <br />
    Block Defence
    <br />
    {{ blockDefenceEnergy }} energy
    <br />
    <button @click="increaseBlockDefenceEnergy">+</button>
    <button @click="decreaseBlockDefenceEnergy">-</button>
  </div>
</template>

<script setup lang="ts">
import EnergyBar from '@/components/EnergyBar.vue'
import { ref } from 'vue'

import { useEnergyStore } from '@/stores/energyStore'
const energyStore = useEnergyStore()

const regularAttackEnergy = ref<number>(0)
const blockDefenceEnergy = ref<number>(0)

function increaseRegularAttackEnergy(): void {
  if (energyStore.allocateEnergy(1)) {
    regularAttackEnergy.value += 1
  }
}

function decreaseRegularAttackEnergy(): void {
  if (energyStore.reclaimEnergy(1)) {
    regularAttackEnergy.value -= 1
  }
}

function increaseBlockDefenceEnergy(): void {
  if (energyStore.allocateEnergy(1)) {
    blockDefenceEnergy.value += 1
  }
}

function decreaseBlockDefenceEnergy(): void {
  if (energyStore.reclaimEnergy(1)) {
    blockDefenceEnergy.value -= 1
  }
}
</script>

<style scoped></style>
