<template>
  <div class="status-field-border" :style="{ width: props.width }">
    <v-icon v-if="icon" :name="icon" class="indicator-icon" />
    <span v-else class="indicator-label">{{ props.name }}: </span>

    <span class="indicator-value">
      {{ formatDecimal(props?.value || new Decimal(0)) }}
      <template v-if="props.max"> / {{ formatDecimal(props.max) }} </template>
    </span>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/domain/enums'
import { formatDecimal } from '@/presentation/utils/formatDecimal'
import Decimal from 'break_infinity.js'

interface Props {
  name?: string
  value?: Decimal
  max?: Decimal
  width?: string
  icon?: Icons
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
})
</script>

<style scoped>

.indicator-icon {
  width: 16px;
  height: 16px;
}

.indicator-label {
  font-weight: 600;
}

.indicator-value {
  font-weight: 700;
}
</style>
