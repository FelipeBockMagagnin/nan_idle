<template>
  <div class="inventory-page">
    <h2 class="page-title">Inventory</h2>

    <div class="game-container">
      <div class="panel equipment-panel">
        <div class="equipment-paper-doll">
          <div
            v-for="(slot, key) in equipmentSlots"
            :key="key"
            class="slot-wrapper"
            :style="{ gridArea: key }"
          >
            <div class="item-slot equipment-slot">
              <div class="empty-placeholder">{{ slot.label }}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="panel inventory-panel">
        <h3>Inventory</h3>
        <div class="inventory-scroll-area">
          <div class="inventory-grid">
            <div
              v-for="(slot, index) in inventory"
              :key="index"
              class="item-slot grid-slot"
            ></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const maxSlots = 60
const inventory = ref(new Array(maxSlots).fill(null))

// Keys must match the CSS 'grid-area' names exactly
const equipmentSlots = ref({
  head: { label: 'Head' },
  accessory: { label: 'Acc.' }, // Left side (NGU Cube position)
  chest: { label: 'Chest' }, // Center
  weapon: { label: 'Wep.' }, // Right side
  legs: { label: 'Legs' }, // Bottom
  boots: { label: 'Boots' }, // Bottom
})
</script>

<style scoped>
/* --- BASE STYLES --- */
.inventory-page {
  font-family: 'Segoe UI', Tahoma, sans-serif;
  color: #eee;
  background-color: #222;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.page-title {
  text-align: center;
  color: #ffa500;
  margin: 10px 0;
}

.game-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  align-items: flex-start;
  padding: 10px;
}

.panel {
  background-color: #333;
  border: 1px solid #444;
  border-radius: 8px;
  padding: 10px;
}

h3 {
  margin: 0 0 15px 0;
  font-size: 1rem;
  border-bottom: 1px solid #555;
  padding-bottom: 5px;
  text-align: center;
}

/* --- COMMON SLOT STYLES --- */
.item-slot {
  width: 50px;
  height: 50px;
  background-color: #1a1a1a;
  border: 2px solid #555;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
}

.item-slot:hover {
  border-color: #888;
}

.empty-placeholder {
  font-size: 0.6rem;
  color: #555;
  text-transform: uppercase;
}

/* --- NGU LAYOUT IMPLEMENTATION --- */
.equipment-panel {
  /* No fixed width, let grid define it */
  display: flex;
  flex-direction: column;
  align-items: center;
}

.equipment-paper-doll {
  display: grid;
  /* Define the layout shape using named areas */
  grid-template-areas:
    '.         head       .'
    'accessory chest      weapon'
    '.         legs       .'
    '.         boots       .';

  gap: 10px; /* Space between slots */
  justify-content: center;
  padding: 10px;
}

/* Wrapper to ensure the grid area applies correctly */
.slot-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

/* --- INVENTORY GRID --- */
.inventory-panel {
  /* Optional: Limit width if you want it to look like the NGU bottom bar */
}

.inventory-grid {
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 5px;
}

.inventory-scroll-area {
  overflow-y: auto;
  max-height: 60vh;
  padding-right: 5px;
}

/* --- DETAILS PANEL --- */
.details-panel {
  width: 250px;
  min-height: 200px;
}

.no-selection-msg {
  color: #777;
  text-align: center;
  margin-top: 50px;
}

/* --- RESPONSIVE ADJUSTMENTS --- */
@media (max-width: 768px) {
  .game-container {
    flex-direction: column;
    align-items: center;
  }

  .inventory-grid {
    grid-template-columns: repeat(5, 1fr);
  }

  .equipment-paper-doll {
    /* Slightly larger gap on mobile for touch targets */
    gap: 15px;
  }
}
</style>
