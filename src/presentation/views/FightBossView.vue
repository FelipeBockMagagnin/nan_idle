<template>
  <div class="window" style="min-height: 100%;">
    <div class="title-bar">
      <div class="title-bar-text">Fight Boss</div>
      <div class="title-bar-controls"></div>
    </div>
    <div class="window-body">

    <div>
      <!-- Player Section -->
      <div class="character-card">
        <div class="character-name">Player</div>
        <div class="image-frame sunken-panel">
          <img src="/assets/player/player_2.jpg" class="boss-image" />
        </div>

        <HPBar
          :currentHP="playerStore.stats.currentHP"
          :maxHP="playerStore.stats.maxHP"
        />
        
        <div class="regen-text" v-if="playerStore.stats.maxHP.greaterThan(playerStore.stats.currentHP)">
          (+{{ formatDecimal(playerStore.stats.hpRegen) }} HP/s)
        </div>
        <div class="regen-text-spacer" v-else></div>

        <div class="stats-panel">
          <AttackIndicator class="stat-half" />
          <DefenceIndicator class="stat-half" />
        </div>
      </div>

      <!-- VS Icon -->
      <div class="vs-section">
        <v-icon :name="Icons.Sword" class="vs-icon" />
      </div>

      <!-- Boss Section -->
      <div v-if="fightBossStore.enemy" class="character-card">
        <div class="character-name">
          {{ fightBossStore.enemy.name }} <span class="enemy-id">- #{{ fightBossStore.enemy.id }}</span>
        </div>
        
        <div class="image-frame sunken-panel">
          <img
            :src="'/assets/enemy/' + fightBossStore.enemy.image"
            class="boss-image"
            :style="{
              backgroundImage: `url(/assets/background/${fightBossStore.enemy.background})`,
              backgroundSize: 'contain',
            }"
          />
        </div>

        <HPBar
          :currentHP="fightBossStore.enemy.stats.hp"
          :maxHP="fightBossStore.enemy.stats.maxHp"
        />
        <div class="regen-text" v-if="fightBossStore.enemy.stats.maxHp.greaterThan(fightBossStore.enemy.stats.hp)">
          (+{{ formatDecimal(fightBossStore.enemy.stats.hpRegen) }} HP/s)
        </div>
        <div class="regen-text-spacer" v-else></div>
        
        <div class="stats-panel">
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Sword"
            :value="fightBossStore.enemy.stats.attack"
          />
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Shield"
            :value="fightBossStore.enemy.stats.defence"
          />
        </div>
      </div>
    </div>
    
    <div class="action-footer">
      <button
        class="fight-button"
        @click="fight"
        v-if="playerStore.stats.currentHP.greaterThanOrEqualTo(1)"
        :class="{ 'is-fighting': fightBossStore.isFighting() }"
      >
        {{ fightBossStore.isFighting() ? 'Stop' : 'Fight' }}
      </button>
    </div>

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
import { formatDecimal } from '@/presentation/utils/formatDecimal'
import { Icons } from '@/domain/enums'

const playerStore = usePlayerStore()
const fightBossStore = useFightBossStore()

function fight(): void {
  fightBossStore.changeFightState()
}
</script>

<style scoped>
.fight-arena {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
}

.character-name {
  font-weight: bold;
  font-size: 16px;
  color: #222;
}

.enemy-id {
  font-weight: normal;
  font-size: 12px;
  color: #555;
}

.image-frame {
  margin-bottom: 5px;
}

.boss-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  image-rendering: pixelated;
  display: block;
}

.vs-section {
  margin: 10px 0;
}

.vs-icon {
  width: 24px;
  height: 24px;
  color: #555;
}

.stats-panel {
  display: flex;
  margin: 10px auto 10px auto;
  width: 320px;
}

.stat-half {
  flex: 1;
  text-align: center;
  padding: 6px;
  font-weight: bold;
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}

.action-footer {
  display: flex;
  justify-content: center;
  margin-top: 10px;
  padding-bottom: 20px;
}

.fight-button {
  width: 200px;
  height: 50px;
  font-size: 22px;
  font-weight: bold;
}

.fight-button.is-fighting {
  color: #b61414;
}

.regen-text {
  font-size: 11px;
  color: #006400; /* Dark green showing regeneration in 98.css typical theme */
  font-style: italic;
  font-weight: bold;
  height: 14px;
}

.regen-text-spacer {
  height: 14px;
}
</style>
