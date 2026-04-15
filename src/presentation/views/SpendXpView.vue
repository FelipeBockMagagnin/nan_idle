<template>
  <div class="window" style="min-height: 100%;">
    <div class="title-bar">
      <div class="title-bar-text">Spend XP</div>
      <div class="title-bar-controls"></div>
    </div>
    <div class="window-body">
      
      <div class="page-container">
        
        <div class="stats-panel">
          <div class="stat-full">
            Available XP: <strong>{{ formatDecimal(playerStore.resources.xp) }}</strong>
          </div>
        </div>

        <div class="upgrade-list">
          
          <!-- Energy Capacity -->
          <div class="upgrade-card">
            <div class="card-left">
              <div class="image-box sunken-panel">
                <v-icon :name="Icons.Energy" class="upgrade-icon" />
              </div>
            </div>
            <div class="card-right">
              <div class="upgrade-header">
                <span class="upgrade-name">Energy Capacity</span>
                <span class="upgrade-current">Max: {{ formatDecimal(energyStore.energy.max) }}</span>
              </div>
              <div class="upgrade-action-row">
                <span class="upgrade-cost">Cost: {{ playerStore.getUpdate(XpUpgradeType.ENERGY_CAP).cost }} XP</span>
                <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_CAP)" :disabled="playerStore.resources.xp.lessThan(new Decimal(playerStore.getUpdate(XpUpgradeType.ENERGY_CAP).cost))">
                  Buy (+{{ playerStore.getUpdate(XpUpgradeType.ENERGY_CAP).gain }})
                </button>
              </div>
            </div>
          </div>

          <!-- Energy Power -->
          <div class="upgrade-card">
            <div class="card-left">
              <div class="image-box sunken-panel">
                <v-icon :name="Icons.Sword" class="upgrade-icon" />
              </div>
            </div>
            <div class="card-right">
              <div class="upgrade-header">
                <span class="upgrade-name">Energy Power</span>
                <span class="upgrade-current">Power: {{ formatDecimal(energyStore.energy.power) }}</span>
              </div>
              <div class="upgrade-action-row">
                <span class="upgrade-cost">Cost: {{ playerStore.getUpdate(XpUpgradeType.ENERGY_POWER).cost }} XP</span>
                <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_POWER)" :disabled="playerStore.resources.xp.lessThan(new Decimal(playerStore.getUpdate(XpUpgradeType.ENERGY_POWER).cost))">
                  Buy (+{{ playerStore.getUpdate(XpUpgradeType.ENERGY_POWER).gain }})
                </button>
              </div>
            </div>
          </div>

          <!-- Energy Regeneration Rate -->
          <div class="upgrade-card">
            <div class="card-left">
              <div class="image-box sunken-panel">
                <span class="text-icon">RGN</span>
              </div>
            </div>
            <div class="card-right">
              <div class="upgrade-header">
                <span class="upgrade-name">Regeneration</span>
                <span class="upgrade-current">Rate: {{ formatDecimal(energyStore.energy.regenerationRate) }}/s</span>
              </div>
              <div class="upgrade-action-row">
                <span class="upgrade-cost">Cost: {{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).cost }} XP</span>
                <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_REGENERATION_RATE)" :disabled="playerStore.resources.xp.lessThan(new Decimal(playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).cost))">
                  Buy (+{{ playerStore.getUpdate(XpUpgradeType.ENERGY_REGENERATION_RATE).gain }})
                </button>
              </div>
            </div>
          </div>

          <!-- Energy Bars -->
          <div class="upgrade-card">
            <div class="card-left">
              <div class="image-box sunken-panel">
                <span class="text-icon">BARS</span>
              </div>
            </div>
            <div class="card-right">
              <div class="upgrade-header">
                <span class="upgrade-name">Energy Bars</span>
                <span class="upgrade-current">Bars: {{ formatDecimal(energyStore.energy.bars) }}</span>
              </div>
              <div class="upgrade-action-row">
                <span class="upgrade-cost">Cost: {{ playerStore.getUpdate(XpUpgradeType.ENERGY_BARS).cost }} XP</span>
                <button @click="playerStore.buyXpUpgrade(XpUpgradeType.ENERGY_BARS)" :disabled="playerStore.resources.xp.lessThan(new Decimal(playerStore.getUpdate(XpUpgradeType.ENERGY_BARS).cost))">
                  Buy (+{{ playerStore.getUpdate(XpUpgradeType.ENERGY_BARS).gain }})
                </button>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { usePlayerStore } from '../stores/playerStore'
import { XpUpgradeType } from '@/application/services/PlayerXpService'
import { useEnergyStore } from '../stores/energyStore'
import { formatDecimal } from '@/presentation/utils/formatDecimal'
import Decimal from 'break_infinity.js'
import { Icons } from '@/domain/enums'

const playerStore = usePlayerStore()
const energyStore = useEnergyStore()
</script>

<style scoped>
.page-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 0;
}

.stats-panel {
  display: flex;
  margin: 0 auto 16px auto;
  width: 320px;
  background: #c0c0c0;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.stat-full {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 15px;
  color: #222;
  display: flex;
  justify-content: center;
  align-items: center;
}

.stat-full strong {
  margin-left: 6px;
  color: #0000aa; /* Classic dark blue for XP amounts */
}

.upgrade-list {
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 320px;
}

.upgrade-card {
  display: flex;
  flex-direction: row;
  padding: 6px;
  background-color: #c0c0c0;
  box-shadow: inset -1px -1px #0a0a0a, inset 1px 1px #dfdfdf, inset -2px -2px grey, inset 2px 2px #fff;
  margin: 0 auto 10px auto;
  width: 100%;
  align-items: center;
}

.card-left {
  margin-right: 12px;
  flex-shrink: 0;
}

.image-box {
  width: 48px;
  height: 48px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c0c0c0;
  border-top: 2px solid #808080;
  border-left: 2px solid #808080;
  border-bottom: 2px solid #ffffff;
  border-right: 2px solid #ffffff;
}

.upgrade-icon {
  width: 24px;
  height: 24px;
  color: #555;
}

.text-icon {
  font-size: 12px;
  font-weight: bold;
  color: #444;
}

.card-right {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  justify-content: center;
}

.upgrade-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 6px;
}

.upgrade-name {
  font-weight: bold;
  font-size: 14px;
  color: #222;
}

.upgrade-current {
  font-weight: normal;
  font-size: 12px;
  color: #444;
}

.upgrade-action-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.upgrade-cost {
  font-size: 13px;
  font-weight: bold;
  color: #b61414; /* Dark red for costs */
}

.upgrade-action-row button {
  min-width: 80px;
  padding: 2px 8px;
  font-size: 13px;
  font-weight: bold;
}
</style>
