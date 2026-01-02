<template>
  <div
    class="bar-container"
    :style="{ width: props.width, backgroundColor: props.backgroundColor }"
  >
    <div
      class="bar-fill"
      :style="{
        width: props.progress + '%',
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
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  backgroundColor: '#333',
  barColor: '#be3636',
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
  transition: width 0.1s;
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
