<!-- eslint-disable vue/no-parsing-error -->
<template>
  <Window title="Adventure Zone">
    <div>
      <button @click="goBackZone"><</button>
      <label for="adventure-zone-select">{{ adventureZone?.name }}</label>
      <button @click="goToNextZone">></button>
    </div>

    <div class="fight-container">
      <div class="player-container">
        Player
        <HPBar
          :currentHP="adventurePlayer.stats.currentHP"
          :maxHP="adventurePlayer.stats.maxHP"
          width="80%"
          height="20px"
        />

        <img
          src="/assets/player/player_1.jpeg"
          class="character-image player-image-offset"
        />

        <div class="stats-panel">
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Shield"
            :value="adventurePlayer.stats.toughness"
          />
          <div class="stat-divider"></div>
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Sword"
            :value="adventurePlayer.stats.power"
          />
        </div>
      </div>

      <v-icon
        :name="Icons.Sword"
        class="versus-icon"
      />

      <div
        v-if="adventureZoneStore.currentEnemy"
        class="enemy-container"
      >
        {{ currentEnemy?.name }} - #{{ currentEnemy?.id }}
        <HPBar
          :currentHP="currentEnemy?.stats.hp"
          :maxHP="currentEnemy?.stats.maxHp"
          width="80%"
          height="20px"
        />

        <TimerIndicator
          height="10px"
          width="80%"
          barColor="white"
          :progress="currentEnemy?.getAttackCooldownPercent()"
          :inverted="true"
        />

        <img
          :style="{
            backgroundImage: `url(/assets/background/${currentEnemy?.background})`,
            backgroundSize: 'contain',
          }"
          :src="'/assets/enemy/' + currentEnemy?.image"
          class="character-image"
        />

        <div class="stats-panel">
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Shield"
            :value="currentEnemy?.stats.toughness"
          />
          <div class="stat-divider"></div>
          <IndicatorCard
            class="stat-half"
            :icon="Icons.Sword"
            :value="currentEnemy?.stats.power"
          />
        </div>
      </div>
    </div>
  </Window>

  <Window title="Skills">
    <template v-for="skill in skills" :key="skill.id">
      <AdventureSkill :skill="skill" :select-attack="selectAttack" />
    </template>
  </Window>

  <Window title="Log">
    <div class="field-row-stacked full-width">
      <textarea id="text20" rows="8" value="Entering zone..."></textarea>
    </div>
  </Window>
</template>

<script setup lang="ts">
import { useAdventureZoneStore } from '@/presentation/stores/adventureZoneStore'

import HPBar from '@/presentation/components/HPBar.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons, TrainingSkillsEnum as SkillEnum } from '@/domain/enums'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'
import { storeToRefs } from 'pinia'
import AdventureSkill from '../components/AdventureSkill.vue'
import Window from '../components/Window.vue'

const adventureZoneStore = useAdventureZoneStore()
const { adventurePlayer, adventureZone, currentEnemy, skills } =
  storeToRefs(adventureZoneStore)

function goToNextZone() {
  adventureZoneStore.goToNextZone()
}

function goBackZone() {
  adventureZoneStore.goBackZone()
}

function selectAttack(skill: SkillEnum) {
  adventureZoneStore.playerAttack(skill)
}
</script>

<style scoped>
.fight-container {
  display: flex;
  flex-direction: row;
  position: relative;
}

.player-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: baseline;
}

.enemy-container {
  display: flex;
  flex-direction: column;
  width: 50%;
  align-items: end;
}

.character-image {
  width: 80%;
  margin-bottom: 10px;
  border-radius: 10px;
  image-rendering: pixelated;
}

.player-image-offset {
  margin-top: 10px;
}

.stats-panel {
  display: flex;
  margin-top: 10px;
  width: 100%;
  background: #c0c0c0;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.stat-half {
  flex: 1;
  text-align: center;
  padding: 4px;
  font-weight: bold;
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-divider {
  width: 2px;
  background: #ffffff;
  border-left: 2px solid #808080;
}

.versus-icon {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translateX(-50%);
  z-index: 10;
}

.stat-card {
  margin-right: 10px;
}

.fight-button {
  width: 200px;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
}

.full-width {
  width: 100%;
}
</style>
