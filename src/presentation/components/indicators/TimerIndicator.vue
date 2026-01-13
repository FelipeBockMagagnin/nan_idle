<template>
  <div
    class="bar-container"
    :style="{
      width: props.width,
      backgroundColor: props.backgroundColor,
      height: props.height,
    }"
  >
    <div
      class="bar-fill"
      :style="{
        width: getProgress() + '%',
        background: props.barColor,
      }"
    ></div>
    <span class="bar-text">{{ innerText }}</span>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
  width?: string
  backgroundColor?: string
  innerText?: string
  barColor?: string
  height?: string
  inverted?: boolean
}

function getProgress() {
  if (props.inverted) {
    return 100 - props.progress
  }

  return props.progress
  
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  backgroundColor: '#333',
  barColor: '#be3636',
  height: 'auto',
  inverted: true,
})
</script>

<style scoped>
.bar-container {
  height: 25px;
  border-radius: 15px;
  overflow: hidden;
  position: relative;
}

.bar-fill {
  height: 100%;
}

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
