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
        >
          {{ item.item }} {{ item.slot }}
        </div>
      </div>
    </div>

    <div class="inventory-grid">
      <div
        v-for="(item, index) in inventoryStore.inventory.slots"
        :key="index"
        class="item-slot"
      >
        {{ item }} {{ index }}
      </div>
    </div>
  </div>

  <button
    @click="
      () =>
        inventoryStore.inventory.addItem(
          new Item({
            id: 1,
            initialStats: {},
            level: 1,
            name: 'test',
            slot: ItemSlotEnum.head,
            type: 1,
          })
        )
    "
  >
    Add item Test
  </button>

  <button @click="() => inventoryStore.inventory.equipItem(2, 1)">
    equip item 2 Test
  </button>
</template>

<script setup lang="ts">
import { Item } from '@/domain/entities/Item'
import { useInventoryStore } from '../stores/inventoryStore'
import { ItemSlotEnum } from '@/domain/enums'

const inventoryStore = useInventoryStore()
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
    'accessory pants       .'
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
