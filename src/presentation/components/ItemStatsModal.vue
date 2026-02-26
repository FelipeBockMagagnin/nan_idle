<template>
  <div v-if="visible" class="modal-overlay" @click.self="close">
    <div class="window" style="min-width: 300px; margin: 10px;">
      <div class="title-bar">
        <div class="title-bar-text">Item Stats</div>
        <div class="title-bar-controls">
          <button aria-label="Close" @click="close"></button>
        </div>
      </div>
      <div class="window-body" v-if="item">
        <b>{{ item.name }}</b>
        <br />

        <div>Level: {{ item.level }}</div>
        <img class="item-image" :src="item.image" draggable="true" />

        <template v-if="item instanceof Item">
          <div v-if="item.itemStats.power && item.maxItemStats.power">
            <b>Power:</b>
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="{
                  width:
                    (item.itemStats.power.toNumber() /
                      item.maxItemStats.power.toNumber()) *
                      100 +
                    '%',
                }"
              ></div>
              <span class="progress-bar-text">
                {{ formatDecimal(item.itemStats.power) }} /
                {{ formatDecimal(item.maxItemStats.power) }}</span
              >
            </div>
          </div>

          <div v-if="item.itemStats.toughness && item.maxItemStats.toughness">
            <b>Toughness:</b>
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="{
                  width:
                    (item.itemStats.toughness.toNumber() /
                      item.maxItemStats.toughness.toNumber()) *
                      100 +
                    '%',
                }"
              ></div>
              <span class="progress-bar-text">
                {{ formatDecimal(item.itemStats.toughness) }} /
                {{ formatDecimal(item.maxItemStats.toughness) }}</span
              >
            </div>
          </div>

          <div v-if="item.itemStats.maxHp && item.maxItemStats.maxHp">
            <b>Max Health:</b>
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="{
                  width:
                    (item.itemStats.maxHp.toNumber() /
                      item.maxItemStats.maxHp.toNumber()) *
                      100 +
                    '%',
                }"
              ></div>
              <span class="progress-bar-text">
                {{ formatDecimal(item.itemStats.maxHp) }} /
                {{ formatDecimal(item.maxItemStats.maxHp) }}</span
              >
            </div>
          </div>

          <div v-if="item.itemStats.hpRegen && item.maxItemStats.hpRegen">
            <b>Health Regen/s:</b>
            <div class="progress-bar">
              <div
                class="progress-bar-inner"
                :style="{
                  width:
                    (item.itemStats.hpRegen.toNumber() /
                      item.maxItemStats.hpRegen.toNumber()) *
                      100 +
                    '%',
                }"
              ></div>
              <span class="progress-bar-text">
                {{ formatDecimal(item.itemStats.hpRegen) }} /
                {{ formatDecimal(item.maxItemStats.hpRegen) }}</span
              >
            </div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item } from '@/domain/entities/Item'
import { formatDecimal } from '../utils/formatDecimal'
import { AnyItem } from '@/domain/types'

defineProps<{
  visible: boolean
  item: AnyItem | undefined
}>()

const emit = defineEmits(['close'])

const close = () => {
  emit('close')
}
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}



.item-image {
  width: 100px;
  height: 100px;
}

.progress-bar {
  width: 100%;
  background-color: #555;
  border-radius: 4px;
  overflow: hidden;
  position: relative;
  height: 20px;
}

.progress-bar-inner {
  background-color: #4caf50;
  border-radius: 4px;
  height: 20px;
}

.progress-bar-text {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-size: 12px;
}
</style>
