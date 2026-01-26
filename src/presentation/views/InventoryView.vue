<template>
  <div>
    <h2 class="page-title">Inventory</h2>

    <div class="equipment-panel">
      <div class="equipment-doll">
        <div
          v-for="(item, index) in inventoryStore.inventory.equippedSlots"
          :key="index"
          class="item-slot"
          :style="{ gridArea: item.slot }"
          @dragover.prevent
          @drop="onDrop(index, true)"
        >
          <img
            v-if="item.item"
            :src="item.item.image"
            draggable="true"
            @dragstart="onDragStart($event, index, true)"
            @dragend="onDragEnd($event)"
          />

          <span v-if="item.item">Lv. {{ item.item?.level }}</span>
        </div>
      </div>
    </div>

    <div class="inventory-grid">
      <div
        v-for="(item, index) in inventoryStore.inventory.slots"
        :key="index"
        class="item-slot"
        @dragover.prevent
        @drop="onDrop(index, false)"
      >
        <img
          v-if="item.item"
          :src="item.item.image"
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
import { useInventoryStore } from '../stores/inventoryStore'
import { ref } from 'vue'

const inventoryStore = useInventoryStore()

const dragged = ref<{
  sourceIndex: number
  isEquipped: boolean
} | null>(null)

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
  position: relative;
}

.item-slot span {
  position: absolute;
  bottom: 0;
  right: 0;
  font-size: 10px;
  font-weight: 700;
  background-color: black;
  padding-top: 2px;
  padding-left: 2px;
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
  flex-direction: column;
  align-items: center;
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
