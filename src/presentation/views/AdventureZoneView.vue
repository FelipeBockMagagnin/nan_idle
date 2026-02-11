<!-- eslint-disable vue/no-parsing-error -->
<template>
  <div>
    <h2 class="page-title">Adventure Zone</h2>

    <div>
      <button @click="goBackZone"><</button>
      <label for="adventure-zone-select">{{ adventureZone?.name }}</label>
      <button @click="goToNextZone">></button>
    </div>

    <div class="fight-container">
      Player
      <img src="/assets/player/player_1.jpeg" class="enemy-image" />

      <HPBar
        :currentHP="adventurePlayer.stats.currentHP"
        :maxHP="adventurePlayer.stats.maxHP"
      />

      <div style="display: flex; width: 100px">
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

      <div v-if="adventureZoneStore.currentEnemy" class="fight-container">
        <div>
          <v-icon :name="Icons.Sword" style="margin: 10px" />
        </div>
        {{ currentEnemy?.name }} - #{{ currentEnemy?.id }}
        <img
          :style="{
            backgroundImage: `url(/assets/background/${currentEnemy?.background})`,
            backgroundSize: 'contain',
          }"
          :src="'/assets/enemy/' + currentEnemy?.image"
          class="enemy-image"
        />
        <HPBar
          :currentHP="currentEnemy?.stats.hp"
          :maxHP="currentEnemy?.stats.maxHp"
        />

        <TimerIndicator
          height="10px"
          barColor="white"
          :progress="currentEnemy?.getAttackCooldownPercent()"
          :inverted="true"
        />
        <div style="display: flex; width: 100px">
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

    <template v-for="skill in skills" :key="skill.id">
      <AdventureSkill :skill="skill" :select-attack="selectAttack" />
    </template>
  </div>
</template>

<script setup lang="ts">
import { useAdventureZoneStore } from '@/presentation/stores/adventureZoneStore'

import HPBar from '@/presentation/components/HPBar.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons, TrainingSkillsEnum as SkillEnum } from '@/domain/enums'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'
import { storeToRefs } from 'pinia'
import AdventureSkill from '../components/AdventureSkill.vue'

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
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.enemy-image {
  width: 100px;
  margin-bottom: 10px;
  margin-top: 0px;
  border-radius: 10px;
}

.fight-button {
  width: 200px;
  height: 50px;
  font-size: 25px;
  font-weight: 700;
}
</style>
