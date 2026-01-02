<template>
  <div>
    <h1>Fight Boss</h1>

    <br />

    <div class="fight-boss-container">
      Carol Designer
      <img src="@/assets/player/player_1.jpeg" class="boss-image" />

      <HPBar
        :currentHP="playerStore.stats.currentHP"
        :maxHP="playerStore.stats.maxHP"
      />

      <br /><br />

      Tieppo
      <img src="@/assets/enemy/enemy_1.png" class="boss-image" />
      <HPBar
        :currentHP="fightBossStore.enemy.hp.current"
        :maxHP="fightBossStore.enemy.hp.max"
      />
    </div>

    <br /><br />

    <button @click="regularAttack">Regular Attack</button>
    <button @click="strongAttack">Strong Attack</button>

    <button @click="attackPlayer">Attack Player</button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { useFightBossStore } from '@/stores/fightBossStore'

import HPBar from '@/components/HPBar.vue'
import Decimal from 'break_infinity.js'

const playerStore = usePlayerStore()
const fightBossStore = useFightBossStore()

function regularAttack(): void {
  fightBossStore.damageEnemy(10)
}

function strongAttack(): void {
  fightBossStore.damageEnemy(100)
}

function attackPlayer(): void {
  playerStore.dealDamage(new Decimal(10))
}
</script>

<style scoped>
.fight-boss-container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.boss-image {
  width: 100px;
  margin: 10px;
  border-radius: 10px;
}
</style>
