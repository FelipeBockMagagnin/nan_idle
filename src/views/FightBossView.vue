<template>
  <div>
    <h1>Fight Boss</h1>

    <br />
    Player
    <HPBar :currentHP="hpStore.hp.current" :maxHP="hpStore.hp.max" />

    <br /><br />

    Enemy
    <HPBar
      :currentHP="fightBossStore.enemy.hp.current"
      :maxHP="fightBossStore.enemy.hp.max"
    />

    <br /><br />

    <button @click="regularAttack">Regular Attack</button>
    <button @click="strongAttack">Strong Attack</button>
  </div>
</template>

<script setup lang="ts">
import { useHPStore } from '@/stores/hpStore'
import { useFightBossStore } from '@/stores/fightBossStore'

import HPBar from '@/components/HPBar.vue'

const hpStore = useHPStore()
const fightBossStore = useFightBossStore()

function regularAttack(): void {
  fightBossStore.damageEnemy(10)
}

function strongAttack(): void {
  fightBossStore.damageEnemy(100)
}
</script>

<style scoped></style>
