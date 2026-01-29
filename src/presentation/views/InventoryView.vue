<template>
  <div>
    <h2 class="page-title">Inventory</h2>

    <ItemStatsModal
      :visible="isModalVisible"
      :item="selectedItem"
      @close="closeItemModal"
    />

    <div class="equipment-panel">
      <div class="equipment-doll">
        <div
          v-for="(item, index) in inventory.equippedSlots"
          :key="index"
          class="item-slot"
          :style="{ gridArea: item.slot }"
          @dragover.prevent
          @drop="onDrop(index, true)"
          @click="showItemStats(item.item)"
        >
          <img
            v-if="item.item"
            class="draggable"
            :src="item.item.image"
            draggable="true"
            @dragstart="onDragStart($event, index, true)"
            @dragend="onDragEnd($event)"
          />

          <span v-if="item.item">Lv. {{ item.item?.level }}</span>
        </div>
      </div>

      <div class="equipment-stats">
        <h4>Equipment Bonuses</h4>

        <div v-if="inventoryStats.power?.greaterThan(0)">
          <b>Power:</b> +{{ formatDecimal(inventoryStats.power) }}
        </div>
        <div v-if="inventoryStats.toughness?.greaterThan(0)">
          <b>Toughness:</b> +{{ formatDecimal(inventoryStats.toughness) }}
        </div>
        <div v-if="inventoryStats.maxHp?.greaterThan(0)">
          <b>Max Health:</b> +{{ formatDecimal(inventoryStats.maxHp) }}
        </div>
        <div v-if="inventoryStats.hpRegen?.greaterThan(0)">
          <b>Health Regen/s:</b> +{{ formatDecimal(inventoryStats.hpRegen) }}
        </div>
      </div>
    </div>

    <div class="inventory-grid">
      <div
        v-for="(item, index) in inventory.slots"
        :key="index"
        class="item-slot"
        @dragover.prevent
        @drop="onDrop(index, false)"
        @click="showItemStats(item.item)"
      >
        <img
          v-if="item.item"
          :src="item.item.image"
          class="draggable"
          draggable="true"
          @dragstart="onDragStart($event, index, false)"
          @dragend="onDragEnd($event)"
        />
        <span v-if="item.item">Lv. {{ item.item?.level }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useInventoryStore } from '../stores/inventoryStore'
import { ref } from 'vue'
import ItemStatsModal from '../components/ItemStatsModal.vue'
import { AnyItem } from '@/domain/types'
import { formatDecimal } from '../utils/formatDecimal'

const inventoryStore = useInventoryStore()

const { inventory, inventoryStats } = storeToRefs(inventoryStore)

const dragged = ref<{
  sourceIndex: number
  isEquipped: boolean
} | null>(null)

const isModalVisible = ref(false)
const selectedItem = ref<AnyItem>()

function showItemStats(item: AnyItem | undefined) {
  selectedItem.value = item
  isModalVisible.value = true
}

function closeItemModal() {
  isModalVisible.value = false
  selectedItem.value = undefined
}

function onDragStart(
  event: DragEvent,
  sourceIndex: number,
  isEquipped: boolean
) {
  dragged.value = { sourceIndex, isEquipped }
  if (event.target instanceof HTMLElement) {
    event.target.classList.add('dragging')
  }
}

function onDragEnd(event: DragEvent) {
  dragged.value = null
  if (event.target instanceof HTMLElement) {
    event.target.classList.remove('dragging')
  }
}

function onDrop(targetIndex: number, isTargetEquipped: boolean) {
  if (dragged.value) {
    const { sourceIndex, isEquipped } = dragged.value

    inventoryStore.inventory.equipItem(
      sourceIndex,
      targetIndex,
      isEquipped,
      isTargetEquipped
    )
  }
}
</script>

<style scoped>
.draggable {
  -webkit-touch-callout: none; 
  -webkit-user-select: none;
  user-select: none;
  touch-action: none;
}

.item-slot {
  width: 50px;
  height: 50px;
  background: url('/public/assets/ui/item_container.png');
  background-size: contain;
  border: 2px solid #555;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.1s;
  position: relative;
}

.item-slot span {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 7px;
  font-weight: 700;
  background-color: black;
}

.item-slot img {
  width: 100%;
  height: 100%;
}

.item-slot img.dragging {
  opacity: 0.5;
  border: 2px dashed #eee;
}

.item-slot:hover {
  border-color: #888;
}

.empty-placeholder {
  font-size: 0.6rem;
  color: #555;
  text-transform: uppercase;
}

.equipment-panel {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
}

.equipment-doll {
  display: grid;
  grid-template-areas:
    '.         head       .'
    'accessory chest      weapon'
    'accessory legs       .'
    '.         boots       .';

  gap: 10px;
  justify-content: center;
  padding: 10px;
}

.slot-wrapper {
  display: flex;
  justify-content: center;
  align-items: center;
}

.inventory-grid {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 5px;
  border: 1px solid black;
  padding: 10px;
}
</style>
