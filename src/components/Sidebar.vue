<template>
  <aside class="sidebar" :class="{ 'is-open': isOpen }">
    <h2 style="margin: 3px">NaN IDLE</h2>

    <div class="sidebar-menu-container">
      <RouterLink RouterLink to="/"> Training </RouterLink>
      <RouterLink to="/fight-boss"> Fight Boss </RouterLink>
      <button v-if="isLocalhost" @click="resetData">Reset Data</button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'

defineProps<{
  isOpen: boolean
}>()

const isLocalhost = computed(() => {
  return window.location.hostname === 'localhost'
})

const resetData = () => {
  localStorage.clear()
  window.location.reload()
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  background-color: #333;
  color: white;
  padding-left: 20px;
  padding-right: 20px;
  overflow-y: auto;
  z-index: 200;
  transform: translateX(100%);
  transition: transform 0.1s ease-in-out;
}

.sidebar.is-open {
  transform: translateX(0);
}

.sidebar-menu-container {
  display: flex;
  flex-direction: column;
}

.sidebar-menu-container a {
  margin-bottom: 5px;
}
</style>
