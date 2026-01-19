<template>
  <div>
    <h2 class="page-title">Spend XP</h2>

    <div style="display: flex; padding: 0px 10px; margin-bottom: 10px">
      <EnergyIndicator />
      <AttackIndicator />
      <DefenceIndicator />
    </div>

    <b>XP: {{ playerStore.resources.xp }}</b>

    <br />
    <br />

    <b>Energy Capacity</b>
    <br />
    Current: {{ energyStore.energy.max }}
    <br />
    Cost: {{ playerStore.getXpUpgradeCost(XpUpgradeType.ENERGY_CAP) }} XP
    <br />
    <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_CAP)">
      Buy
    </button>

    <br />
    <br />

    <b>Energy Power</b>

    <br />
    Current: {{ energyStore.energy.power }}
    <br />
    Cost:
    {{ playerStore.getXpUpgradeCost(XpUpgradeType.ENERGY_POWER) }}
    XP
    <br />
    <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_POWER)">
      Buy
    </button>

    <br />
    <br />

    <b>Energy Regeneration Rate</b>
    <br />
    Current: {{ energyStore.energy.regenerationRate }}/second
    <br />
    Cost:
    {{ playerStore.getXpUpgradeCost(XpUpgradeType.ENERGY_REGENERATION_RATE) }}
    XP
    <br />
    <button
      @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_REGENERATION_RATE)"
    >
      Buy
    </button>
  </div>
</template>

<script setup lang="ts">
import EnergyIndicator from '@/presentation/components/indicators/EnergyIndicator.vue'
import AttackIndicator from '@/presentation/components/indicators/AttackIndicator.vue'
import DefenceIndicator from '@/presentation/components/indicators/DefenceIndicator.vue'
import { usePlayerStore } from '../stores/playerStore'
import { XpUpgradeType } from '@/application/services/PlayerXpService'
import { useEnergyStore } from '../stores/energyStore'

const playerStore = usePlayerStore()
const energyStore = useEnergyStore()
</script>

<style scoped></style>
