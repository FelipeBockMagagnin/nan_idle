<template>
  <div
    class="hp-bar-container"
    :style="{ width: props.width, height: props.height }"
  >
    <div
      class="hp-bar-fill"
      :style="{
        width: props?.currentHP?.multiply(100).divide(props?.maxHP || 1) + '%',
      }"
    ></div>
    <div class="hp-label">
      {{ formatDecimal(props?.currentHP || new Decimal(0)) }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { formatDecimal } from '@/presentation/utils/formatDecimal'
import Decimal from 'break_infinity.js'

interface Props {
  width?: string
  height?: string
  currentHP?: Decimal
  maxHP?: Decimal
}

const props = withDefaults(defineProps<Props>(), {
  width: '200px',
  height: '25px',
})
</script>

<style scoped>
.hp-bar-container {
  background-color: #333;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.hp-bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #af4c4c, #be3636);
  transition: width 0.1ms ease-in-out;
}

.hp-label {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 100%;
  transform: translate(-50%, -50%);
  color: white;
  font-weight: bold;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.7);
  font-size: 14px;
}
</style>
