<template>
  <div class="window" style="min-height: 100vh;">
    <div class="title-bar">
      <div class="title-bar-text">Spend XP</div>
      <div class="title-bar-controls"></div>
    </div>
    <div class="window-body">

    <b>XP: {{ playerStore.resources.xp }}</b>

    <br />
    <br />

    <b>Energy Capacity</b>
    <br />
    Current: {{ energyStore.energy.max }}
    <br />
    Cost: {{ playerStore.getUpdate(XpUpgradeType.ENERGY_CAP).cost }} XP
    <br />
    <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_CAP)">
      Buy {{ playerStore.getUpdate(XpUpgradeType.ENERGY_CAP).gain }}
    </button>

    <br />
    <br />

    <b>Energy Power</b>

    <br />
    Current: {{ energyStore.energy.power }}
    <br />
    Cost:
    {{ playerStore.getUpdate(XpUpgradeType.ENERGY_POWER).cost }}
    XP
    <br />
    <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_POWER)">
      Buy {{ playerStore.getUpdate(XpUpgradeType.ENERGY_POWER).gain }}
    </button>

    <br />
    <br />

    <b>Energy Regeneration Rate</b>
    <br />
    Current: {{ energyStore.energy.regenerationRate }}/second
    <br />
    Cost:
    {{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).cost }}
    XP
    <br />
    <button
      @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_REGENERATION_RATE)"
    >
      Buy
      {{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).gain }}
    </button>

    <br />
    <br />

    <b>Energy Bars</b>
    <br />
    Current: {{ energyStore.energy.regenerationRate }}/second
    <br />
    Cost:
    {{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).cost }}
    XP
    <br />
    <button
      @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_REGENERATION_RATE)"
    >
      Buy
      {{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).gain }}
    </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../stores/playerStore'
import { XpUpgradeType } from '@/application/services/PlayerXpService'
import { useEnergyStore } from '../stores/energyStore'

const playerStore = usePlayerStore()
const energyStore = useEnergyStore()
</script>

<style scoped></style>
