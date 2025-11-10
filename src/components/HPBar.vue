<template>
  <div class="hp-bar-container" :style="{ width: props.width }">
    <div
      class="hp-bar-fill"
      :style="{ width: (props.currentHP * 100) / props.maxHP + '%' }"
    ></div>
    <div class="hp-label">{{ props.currentHP }} / {{ props.maxHP }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  width: {
    type: String,
    default: '200px',
  },
  currentHP: {
    type: Number,
    required: true,
  },
  maxHP: {
    type: Number,
    required: true,
  },
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
  transition: width 0.5s ease-in-out;
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
