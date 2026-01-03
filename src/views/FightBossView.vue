<template>
  <div>
    <h2 class="page-title">Training</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    <br />

    <div class="fight-boss-container">
      Player
      <img src="@/assets/player/player_2.jpg" class="boss-image" />

      <HPBar
        :currentHP="playerStore.stats.currentHP"
        :maxHP="playerStore.stats.maxHP"
      />

      <br />
      X
      <br />
      <br />
      <div v-if="fightBossStore.enemy" class="fight-boss-container">
        {{ fightBossStore.enemy.name }} - #{{ fightBossStore.enemy.id }}
        <img :src="fightBossStore.enemy.image" class="boss-image" />
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
    <button class="fight-button" @click="fight">
      {{ fightBossStore.fighting ? 'Stop' : 'Fight' }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { useFightBossStore } from '@/stores/fightBossStore'

import HPBar from '@/components/HPBar.vue'
import EnergyIndicator from '@/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/components/indicators/DefenceIndicator.vue'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { Icons } from '@/enums'

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
