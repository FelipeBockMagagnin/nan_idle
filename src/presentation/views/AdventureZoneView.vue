<template>
  <div>
    <h2 class="page-title">Adventure Zone</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    <br />

    <div>
      <label for="adventure-zone-select">Select Zone:</label>
      <select id="adventure-zone-select" @change="onZoneChange">
        <option
          v-for="zone in adventureZoneStore.adventureZones"
          :key="zone.id"
          :value="zone.id"
          :selected="zone.id === adventureZoneStore.adventureZone?.id"
        >
          {{ zone.name }}
        </option>
      </select>
    </div>

    <br />

    <div class="fight-container">
      Player
      <img src="/assets/player/player_1.jpeg" class="enemy-image" />

      <HPBar
        :currentHP="adventureZoneStore.adventurePlayer.stats.currentHP"
        :maxHP="adventureZoneStore.adventurePlayer.stats.maxHP"
      />

      <br />

      <div v-if="adventureZoneStore.currentEnemy" class="fight-container">
        X
        <br />
        <br />
        {{ adventureZoneStore.currentEnemy?.name }} - #{{
          adventureZoneStore.currentEnemy.id
        }}
        <img
          :src="'/assets/enemy/' + adventureZoneStore.currentEnemy.image"
          class="enemy-image"
        />
        <HPBar
          :currentHP="adventureZoneStore.currentEnemy.stats.hp"
          :maxHP="adventureZoneStore.currentEnemy.stats.maxHp"
        />

        <TimerIndicator
          height="10px"
          barColor="white"
          :progress="adventureZoneStore.currentEnemy.getAttackCooldownPercent()"
          :inverted="true"
        />
        <div style="display: flex; width: 60%">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="adventureZoneStore.currentEnemy.stats.power"
            :show-border="false"
          />
        </div>
      </div>
    </div>

    <button
      @click="selectAttack(TrainingSkillsEnum.RegularAttack)"
      style="width: 150px"
    >
      <span
        v-if="
          !adventureZoneStore
            .getPlayersSkill(TrainingSkillsEnum.RegularAttack)
            ?.attackOnCooldown()
        "
        >Regular Attack</span
      >
      <span v-else>{{
        adventureZoneStore.getPlayerAttackCooldown(
          TrainingSkillsEnum.RegularAttack
        )
      }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import { useAdventureZoneStore } from '@/presentation/stores/adventureZoneStore'

import HPBar from '@/presentation/components/HPBar.vue'
import EnergyIndicator from '@/presentation/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons, TrainingSkillsEnum } from '@/domain/enums'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'

const adventureZoneStore = useAdventureZoneStore()

function onZoneChange(event: Event) {
  const target = event.target as HTMLSelectElement
  adventureZoneStore.setAdventureZone(parseInt(target.value))
}

function selectAttack(skill: TrainingSkillsEnum) {
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
