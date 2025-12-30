<template>
  <div
    class="bar-container"
    :style="{ width: props.width, backgroundColor: props.backgroundColor }"
  >
    <div
      class="bar-fill"
      :style="{
        width: props.progress + '%',
      }"
    ></div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  progress: number
  width?: string
  backgroundColor?: string
}

const props = withDefaults(defineProps<Props>(), {
  width: '100%',
  backgroundColor: '#333',
})
</script>

<style scoped>
.bar-container {
  height: 25px;
  border-radius: 15px;
  overflow: hidden;
}

.bar-fill {
  height: 100%;
  background: linear-gradient(90deg, #af4c4c, #be3636);
  transition: width 0.1s;
}
</style>
