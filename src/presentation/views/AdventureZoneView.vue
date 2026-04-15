<template>
  <div class="window" style="min-height: 100%;">
    <div class="title-bar">
      <div class="title-bar-text">Adventure Zone</div>
      <div class="title-bar-controls"></div>
    </div>
    
    <div class="window-body">
      
      <!-- Zone Selector -->
      <div class="zone-header">
        <button @click="goBackZone" class="nav-btn">◀</button>
        <div class="zone-title sunken-panel">{{ adventureZone?.name }}</div>
        <button @click="goToNextZone" class="nav-btn">▶</button>
      </div>

      <!-- Fight Arena -->
      <div class="fight-arena">
        
        <!-- Player -->
        <div class="character-card">
          <div class="character-name">Player</div>
          <div class="image-frame sunken-panel">
            <img src="/assets/player/player_1.jpeg" class="adv-image" />
          </div>
          
          <HPBar
            :currentHP="adventurePlayer.stats.currentHP"
            :maxHP="adventurePlayer.stats.maxHP"
            width="100%"
          />
          <div class="regen-text" v-if="adventurePlayer.stats.maxHP.greaterThan(adventurePlayer.stats.currentHP)">
            (+{{ formatDecimal(adventurePlayer.stats.hpRegen) }} HP/s)
          </div>
          <div class="regen-text-spacer" v-else></div>

          <div class="stats-panel" style="margin-top: 2px;">
            <IndicatorCard class="stat-half" :icon="Icons.Shield" :value="adventurePlayer.stats.toughness" />
            <IndicatorCard class="stat-half" :icon="Icons.Sword" :value="adventurePlayer.stats.power" />
          </div>
        </div>

        <div class="vs-section" v-if="adventureZoneStore.currentEnemy">
          <v-icon :name="Icons.Sword" class="vs-icon" />
        </div>

        <!-- Enemy -->
        <div v-if="adventureZoneStore.currentEnemy" class="character-card">
          <div class="character-name">
            {{ currentEnemy?.name }} <span class="enemy-id">- #{{ currentEnemy?.id }}</span>
          </div>
          
          <div class="image-frame sunken-panel">
            <img
              :src="'/assets/enemy/' + currentEnemy?.image"
              class="adv-image"
              :style="{
                backgroundImage: `url(/assets/background/${currentEnemy?.background})`,
                backgroundSize: 'contain',
              }"
            />
          </div>

          <HPBar
            :currentHP="currentEnemy?.stats.hp"
            :maxHP="currentEnemy?.stats.maxHp"
            width="100%"
          />
          <TimerIndicator
            height="10px"
            barColor="white"
            :progress="currentEnemy?.getAttackCooldownPercent()"
            :inverted="true"
          />

          <div class="stats-panel">
            <IndicatorCard class="stat-half" :icon="Icons.Shield" :value="currentEnemy?.stats.toughness" />
            <IndicatorCard class="stat-half" :icon="Icons.Sword" :value="currentEnemy?.stats.power" />
          </div>
        </div>
      </div>
      
      <!-- Skills Matrix -->
      <fieldset class="skills-fieldset">
        <legend>Skills</legend>
        <div class="skills-container">
          <template v-for="skill in skills" :key="skill.id">
            <AdventureSkill :skill="skill" :select-attack="selectAttack" />
          </template>
        </div>
      </fieldset>

      <!-- Combat Log -->
      <fieldset class="log-fieldset">
        <legend>Log</legend>
        <div class="field-row-stacked">
          <textarea id="adv-log" rows="5" readonly>Entering zone...</textarea>
        </div>
      </fieldset>
      
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAdventureZoneStore } from '@/presentation/stores/adventureZoneStore'

import HPBar from '@/presentation/components/HPBar.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'
import { Icons, TrainingSkillsEnum as SkillEnum } from '@/domain/enums'
import { storeToRefs } from 'pinia'
import AdventureSkill from '../components/AdventureSkill.vue'
import { formatDecimal } from '@/presentation/utils/formatDecimal'

const adventureZoneStore = useAdventureZoneStore()
const { adventurePlayer, adventureZone, currentEnemy, skills } = storeToRefs(adventureZoneStore)

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
.zone-header {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: 16px;
  gap: 10px;
}

.nav-btn {
  min-width: 30px;
  font-weight: bold;
}

.zone-title {
  padding: 4px 16px;
  background: white;
  min-width: 150px;
  text-align: center;
  font-weight: bold;
  height: 24px;
  overflow: hidden;
}

.fight-arena {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: flex-start;
  margin-bottom: 16px;
  width: 100%;
}

.character-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 45%;
}

.character-name {
  font-weight: bold;
  font-size: 13px;
  color: #222;
  margin-bottom: 4px;
  white-space: nowrap;
}

.enemy-id {
  font-weight: normal;
  font-size: 11px;
  color: #555;
}

.image-frame {
  margin-bottom: 6px;
  background-color: #c0c0c0;
}

.adv-image {
  width: 105px;
  height: 105px;
  object-fit: cover;
  image-rendering: pixelated;
  display: block;
}

.vs-section {
  display: flex;
  align-items: center;
  margin-top: 45px;
}

.vs-icon {
  width: 20px;
  height: 20px;
  color: #555;
}

.stats-panel {
  display: flex;
  margin: 4px auto 0 auto;
  width: 100%;
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

.regen-text {
  font-size: 10px;
  color: #006400;
  font-style: italic;
  font-weight: bold;
  height: 12px;
}

.regen-text-spacer {
  height: 12px;
}

.skills-fieldset {
  margin-bottom: 16px;
  padding: 8px;
}

.skills-container {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  justify-content: center;
}

.log-fieldset {
  margin-bottom: 8px;
  padding: 8px;
}

#adv-log {
  width: 100%;
  resize: none;
  font-family: 'Pixelated MS Sans Serif', Arial, sans-serif;
  font-size: 12px;
  background-color: white;
  color: black;
  box-shadow: inset -1px -1px #fff, inset 1px 1px grey, inset -2px -2px #dfdfdf, inset 2px 2px #0a0a0a;
  border: none;
  padding: 4px;
}
</style>
