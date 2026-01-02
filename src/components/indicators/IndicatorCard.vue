<template>
  <div class="indicator-container" :style="{ width: props.width }">
    <v-icon v-if="icon" :name="icon" />
    <template v-else>
      <span>{{ props.name }}: </span>
      <br />
    </template>

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
  icon?: string
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
