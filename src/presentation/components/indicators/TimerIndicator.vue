<template>
  <template v-if="mainStore.theme === ThemeOptionEnum.Windows98">
    <div
      class="progress-indicator segmented"
      :style="{
        width: props.width,
        height: props.height,
      }"
    >
      <span
        class="progress-indicator-bar"
        :style="{
          width: getProgress() + '%',
        }"
      ></span>
      <span class="bar-text">
        <v-icon v-if="locked" :name="Icons.Lock" />
        <span v-else>{{ innerText }}</span>
      </span>
    </div>
  </template>

  <template v-if="mainStore.theme === ThemeOptionEnum.Windows7">
    <div
      role="progressbar"
      style="position: relative"
      :style="{
        width: props.width,
        height: props.height,
      }"
    >
      <div
        :style="{
          width: getProgress() + '%',
        }"
      >
        <span class="bar-text bar-text-background">
          <v-icon v-if="locked" :name="Icons.Lock" />
          <span v-else>{{ innerText }}</span>
        </span>
      </div>
    </div>
  </template>

  <template v-if="mainStore.theme === ThemeOptionEnum.WindowsXP">
    <div style="position: relative">
      <progress
        max="100"
        :value="getProgress()"
        :style="{
          width: props.width,
          height: props.height,
        }"
      ></progress>
      <span class="bar-text bar-text-background">
        <v-icon v-if="locked" :name="Icons.Lock" />
        <span v-else>{{ innerText }}</span>
      </span>
    </div>
  </template>
</template>

<script setup lang="ts">
import { Icons, ThemeOptionEnum } from '@/domain/enums'
import { useMainStore } from '@/presentation/stores/mainStore'

const mainStore = useMainStore()

interface Props {
  progress?: number
  width?: string
  backgroundColor?: string
  innerText?: string
  barColor?: string
  height?: string
  inverted?: boolean
  locked?: boolean
}

function getProgress() {
  if (props.inverted) {
    return 100 - props.progress
  }

  return props.progress
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  height: '25px',
  backgroundColor: '#333',
  barColor: '#be3636',
  inverted: false,
  progress: 0,
  locked: false,
})
</script>

<style scoped>
.bar-text {
  /* 4. Center the text over the bar */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  /* Flexbox for perfect centering */
  display: flex;
  align-items: center;
  justify-content: center;

  /* Ensure text sits on top of the fill */
  z-index: 2;

  /* Styling for visibility */
  color: white;
  font-weight: bold;
  font-size: 14px;
  pointer-events: none; /* Allows clicks to pass through to the bar if needed */
}
</style>
