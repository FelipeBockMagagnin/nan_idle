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
          :selected="zone.id === adventureZoneStore.adventureZone?.id"
        >
          {{ zone.name }}
        </option>
      </select>
    </div>

    <br />

    <div class="fight-container">
      Player
      <img src="@/assets/player/player_2.jpg" class="enemy-image" />

      <HPBar
        :currentHP="playerStore.stats.currentHP"
        :maxHP="playerStore.stats.maxHP"
      />

      <br />
      X
      <br />
      <br />
      <div v-if="adventureZoneStore.currentEnemy" class="fight-container">
        {{ adventureZoneStore.currentEnemy.name }} - #{{
          adventureZoneStore.currentEnemy.id
        }}
        <img :src="adventureZoneStore.currentEnemy.image" class="enemy-image" />
        <HPBar
          :currentHP="adventureZoneStore.currentEnemy.stats.hp"
          :maxHP="adventureZoneStore.currentEnemy.stats.maxHp"
        />
        <div style="display: flex; width: 60%">
          <IndicatorCard
            style="margin-right: 10px"
            :icon="Icons.Sword"
            :value="adventureZoneStore.currentEnemy.stats.attack"
            :show-border="false"
          />

          <IndicatorCard
            :icon="Icons.Shield"
            :value="adventureZoneStore.currentEnemy.stats.defence"
            :show-border="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '@/stores/playerStore'
import { useAdventureZoneStore } from '@/stores/adventureZoneStore'

import HPBar from '@/components/HPBar.vue'
import EnergyIndicator from '@/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/components/indicators/DefenceIndicator.vue'
import IndicatorCard from '@/components/indicators/IndicatorCard.vue'
import { Icons } from '@/enums'

import { adventureZones } from '@/data/adventure_zones'

const playerStore = usePlayerStore()
const adventureZoneStore = useAdventureZoneStore()

function onZoneChange(event: Event) {
  const target = event.target as HTMLSelectElement
  adventureZoneStore.setAdventureZone(parseInt(target.value))
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
