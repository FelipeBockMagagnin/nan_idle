<template>
  <div class="window" style="min-height: 100vh;">
    <div class="title-bar">
      <div class="title-bar-text">Fight Boss</div>
      <div class="title-bar-controls"></div>
    </div>
    <div class="window-body">

    <div class="fight-boss-container">
      <div class="fight-boss-container">
        Player
        <img src="/assets/player/player_2.jpg" class="boss-image" />

        <HPBar
          :currentHP="playerStore.stats.currentHP"
          :maxHP="playerStore.stats.maxHP"
        />

        <div>
          <AttackIndicator :show-border="false" />
          <DefenceIndicator :show-border="false" />
        </div>
      </div>

      <v-icon :name="Icons.Sword" style="margin: 10px" />

      <div v-if="fightBossStore.enemy" class="fight-boss-container">
        {{ fightBossStore.enemy.name }} - #{{ fightBossStore.enemy.id }}
        <img
          :src="'/assets/enemy/' + fightBossStore.enemy.image"
          class="boss-image"
          :style="{
            backgroundImage: `url(/assets/background/${fightBossStore.enemy.background})`,
            backgroundSize: 'contain',
          }"
        />
        <HPBar
          :currentHP="fightBossStore.enemy.stats.hp"
          :maxHP="fightBossStore.enemy.stats.maxHp"
        />
        <div>
          <IndicatorCard
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
      {{ fightBossStore.isFighting() ? 'Stop' : 'Fight' }}
    </button>
    </div>
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
