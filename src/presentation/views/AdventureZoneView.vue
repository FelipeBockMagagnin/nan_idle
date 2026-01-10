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
      <img src="/src/assets/player/player_1.jpeg" class="enemy-image" />

      <HPBar
        :currentHP="playerStore.stats.currentHP"
        :maxHP="playerStore.stats.maxHP"
      />

      <br />

      <div
        v-if="adventureZoneStore.adventure.currentEnemy"
        class="fight-container"
      >
        X
        <br />
        <br />
        {{ adventureZoneStore.adventure.currentEnemy?.name }} - #{{
          adventureZoneStore.adventure.currentEnemy.id
        }}
        <img
          :src="
            '/src/assets/enemy/' +
            adventureZoneStore.adventure.currentEnemy.image
          "
          class="enemy-image"
        />
        <HPBar
          :currentHP="
            adventureZoneStore.adventure.currentEnemy.adventureStats.hp
          "
          :maxHP="
            adventureZoneStore.adventure.currentEnemy.adventureStats.maxHp
          "
        />
        <div style="display: flex; width: 60%">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="
              adventureZoneStore.adventure.currentEnemy.adventureStats.power
            "
            :show-border="false"
          />
        </div>
      </div>
    </div>

    <button @click="selectAttack(TrainingSkillsEnum.RegularAttack)">
      Regular Attack
    </button>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/presentation/stores/playerStore'
import { useAdventureZoneStore } from '@/presentation/stores/adventureZoneStore'

import HPBar from '@/presentation/components/HPBar.vue'
import EnergyIndicator from '@/presentation/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import IndicatorCard from '@/presentation/components/indicators/IndicatorCard.vue'
import { Icons, TrainingSkillsEnum } from '@/domain/enums'

const playerStore = usePlayerStore()
const adventureZoneStore = useAdventureZoneStore()

function onZoneChange(event: Event) {
  const target = event.target as HTMLSelectElement
  adventureZoneStore.setAdventureZone(parseInt(target.value))
}

function selectAttack(skill: TrainingSkillsEnum) {
  adventureZoneStore.setSelectedAttack(skill)
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
