<template>
  <div class="indicator-container" :style="{ width: props.width }">
    <span>{{ props.name }}: </span>
    <br />
    <strong>
      {{ props.value }}
      <template v-if="props.max"> / {{ props.max }} </template>
    </strong>
  </div>
</template>

<script setup lang="ts">
import Decimal from 'break_infinity.js'

interface Props {
  name: string
  value: Decimal
  max?: Decimal
  width?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
})
</script>

<style scoped>
.indicator-container {
  border: 1px solid greenyellow;
}
</style>
