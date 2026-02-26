<!-- eslint-disable vue/no-parsing-error -->
<template>
  <Window title="Adventure Zone">
    <div>
      <button @click="goBackZone"><</button>
      <label for="adventure-zone-select">{{ adventureZone?.name }}</label>
      <button @click="goToNextZone">></button>
    </div>

    <div class="fight-container">
      <div
        style="
          display: flex;
          flex-direction: column;
          width: 50%;
          align-items: baseline;
        "
      >
        Player
        <HPBar
          :currentHP="adventurePlayer.stats.currentHP"
          :maxHP="adventurePlayer.stats.maxHP"
          width="80%"
          height="20px"
        />

        <img
          src="/assets/player/player_1.jpeg"
          class="enemy-image"
          style="margin-top: 10px"
        />

        <div style="display: flex; gap: 20px">
          <IndicatorCard
            :icon="Icons.Shield"
            :value="adventurePlayer.stats.toughness"
            :show-border="false"
          />
          <IndicatorCard
            :icon="Icons.Sword"
            :value="adventurePlayer.stats.power"
            :show-border="false"
          />
        </div>
      </div>

      <v-icon
        :name="Icons.Sword"
        style="
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
          z-index: 10;
        "
      />

      <div
        v-if="adventureZoneStore.currentEnemy"
        style="
          display: flex;
          flex-direction: column;
          width: 50%;
          align-items: end;
        "
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
          class="enemy-image"
        />

        <div style="display: flex; gap: 20px">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Shield"
            :value="currentEnemy?.stats.toughness"
            :show-border="false"
          />
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="currentEnemy?.stats.power"
            :show-border="false"
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
    <div class="field-row-stacked" style="width: 100%">
      <textarea id="text20" rows="8" value="Entenring zone..."></textarea>
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

.enemy-image {
  width: 80%;
  margin-bottom: 10px;
  border-radius: 10px;
  image-rendering: pixelated;
}

.fight-button {
  width: 200px;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
}
</style>
