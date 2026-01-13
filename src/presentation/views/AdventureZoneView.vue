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
          v-for="zone in adventureZones"
          :key="zone.id"
          :value="zone.id"
          :selected="zone.id === adventureZone?.id"
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
        :currentHP="adventurePlayer.stats.currentHP"
        :maxHP="adventurePlayer.stats.maxHP"
      />

      <br />

      <div v-if="adventureZoneStore.currentEnemy" class="fight-container">
        X
        <br />
        <br />
        {{ currentEnemy?.name }} - #{{
          currentEnemy?.id
        }}
        <img
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
        <div style="display: flex; width: 60%">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="currentEnemy?.stats.power"
            :show-border="false"
          />
        </div>
      </div>
    </div>

    <button
      @click="selectAttack(SkillEnum.RegularAttack)"
      style="width: 150px"
    >
      <span
        v-if="
          !adventureZoneStore
            .getPlayersSkill(SkillEnum.RegularAttack)
            ?.attackOnCooldown()
        "
        >Regular Attack</span
      >
      <span v-else>{{
        adventureZoneStore.getPlayerAttackCooldown(
          SkillEnum.RegularAttack
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
import { Icons, TrainingSkillsEnum as SkillEnum } from '@/domain/enums'
import TimerIndicator from '../components/indicators/TimerIndicator.vue'
import { storeToRefs } from 'pinia'

const adventureZoneStore = useAdventureZoneStore()
const { adventurePlayer, adventureZone, currentEnemy, adventureZones } = storeToRefs(adventureZoneStore)

function onZoneChange(event: Event) {
  const target = event.target as HTMLSelectElement
  adventureZoneStore.setAdventureZone(parseInt(target.value))
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
