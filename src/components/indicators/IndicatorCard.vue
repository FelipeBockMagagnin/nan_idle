<template>
  <div :style="{ border: getBorder(), width: props.width }">
    <v-icon v-if="icon" :name="icon" />
    <template v-else>
      <span>{{ props.name }}: </span>
      <br />
    </template>

    <strong>
      {{ formatDecimal(props.value) }}
      <template v-if="props.max"> / {{ formatDecimal(props.max) }} </template>
    </strong>
  </div>
</template>

<script setup lang="ts">
import { Icons } from '@/enums'
import { formatDecimal } from '@/utils/formatDecimal'
import Decimal from 'break_infinity.js'

interface Props {
  name?: string
  value: Decimal
  max?: Decimal
  width?: string
  icon?: Icons
  showBorder?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  showBorder: true,
})

function getBorder() {
  if (props.showBorder) {
    return '1px solid greenyellow'
  }

  return ''
}
</script>

<style scoped></style>
