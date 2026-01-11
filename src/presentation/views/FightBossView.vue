<template>
  <div>
    <h2 class="page-title">Fight Boss</h2>

    <div class="fight-boss-container">
      <div class="fight-boss-container">
        Player
        <img src="/src/assets/player/player_2.jpg" class="boss-image" />

        <HPBar
          :currentHP="playerStore.stats.currentHP"
          :maxHP="playerStore.stats.maxHP"
        />

        <div style="display: flex; width: 60%">
          <AttackIndicator :show-border="false" />
          <DefenceIndicator :show-border="false" />
        </div>
      </div>

      <br />
      X
      <br />
      <br />
      <div v-if="fightBossStore.enemy" class="fight-boss-container">
        {{ fightBossStore.enemy.name }} - #{{ fightBossStore.enemy.id }}
        <img
          :src="'/src/assets/enemy/' + fightBossStore.enemy.image"
          class="boss-image"
        />
        <HPBar
          :currentHP="fightBossStore.enemy.stats.hp"
          :maxHP="fightBossStore.enemy.stats.maxHp"
        />
        <div style="display: flex; width: 60%">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="fightBossStore.enemy.stats.attack"
            :show-border="false"
          />

          <IndicatorCard
            :icon="Icons.Shield"
            :value="fightBossStore.enemy.stats.defence"
            :show-border="false"
          />
        </div>
      </div>
    </div>
    <br />
    <button
      class="fight-button"
      @click="fight"
      v-if="playerStore.stats.currentHP.greaterThanOrEqualTo(1)"
    >
      {{ fightBossStore.fighting ? 'Stop' : 'Fight' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/presentation/stores/playerStore'
import { useFightBossStore } from '@/presentation/stores/fightBossStore'

import HPBar from '@/presentation/components/HPBar.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons } from '@/domain/enums'

const playerStore = usePlayerStore()
const fightBossStore = useFightBossStore()

function fight(): void {
  fightBossStore.changeFightState()
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

.fight-button {
  width: 200px;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
}
</style>
