<template>
  <div class="hp-bar-container" :style="{ width: props.width }">
    <div
      class="hp-bar-fill"
      :style="{
        width: props.currentHP.multiply(100).divide(props.maxHP) + '%',
      }"
    ></div>
    <div class="hp-label">
      {{ formatDecimal(props.currentHP) }} / {{ formatDecimal(props.maxHP) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDecimal } from '@/utils/formatDecimal'
import Decimal from 'break_infinity.js'

interface Props {
  width?: string
  currentHP: Decimal
  maxHP: Decimal
}

const props = withDefaults(defineProps<Props>(), {
  width: '200px',
})
</script>

<style scoped>
.hp-bar-container {
  width: 200px;
  height: 25px;
  background-color: #333;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.hp-bar-fill {
  height: 100%;
  width: 75%;
  background: linear-gradient(90deg, #af4c4c, #be3636);
  transition: width 0.1s ease-in-out;
}

.hp-label {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-size: 14px;
}
</style>
