<template>
  <div>
    <h1>Fight Boss</h1>

    <br />
    <HPBar :currentHP="hpStore.hp.current" :maxHP="hpStore.hp.max" />

    <br /><br />

    <button @click="regularAttack">Regular Attack</button>
  </div>
</template>

<script setup>
import { useHPStore } from '../stores/hpStore'

import HPBar from '../components/HPBar.vue'

const hpStore = useHPStore()

function regularAttack() {
  hpStore.changeHP(-10)
}
</script>

<style scoped></style>
