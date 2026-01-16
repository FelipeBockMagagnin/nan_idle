<template>
  <aside class="sidebar">
    <h3 style="margin: 8px">NaN IDLE</h3>

    <div class="sidebar-menu-container">
      <RouterLink to="/">
        <v-icon name="fa-bolt" />
        <span class="text">Training</span>
      </RouterLink>
      <RouterLink to="/fight-boss">
        <v-icon name="ri-sword-fill" />
        <span class="text">Fight Boss</span>
      </RouterLink>
      <RouterLink to="/adventure">
        <v-icon name="fa-map" />
        <span class="text">Adventure</span>
      </RouterLink>
      <button v-if="isLocalhost" @click="resetData" class="hide-on-mobile">
        Reset Data
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useMainStore } from '@/presentation/stores/mainStore'

const isLocalhost = computed(() => {
  return window.location.hostname === 'localhost'
})

const resetData = () => {
  const mainStore = useMainStore()
  mainStore.resetGame()
}
</script>

<style scoped>
.router-link-active {
  color: #646cff;
}

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
}

.sidebar-menu-container {
  display: flex;
  flex-direction: column;
}

.sidebar-menu-container a {
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  gap: 5px;
}

@media (max-width: 768px) {
  .sidebar {
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    justify-content: space-around;
    padding: 10px 0;
  }

  .sidebar-menu-container {
    flex-direction: row;
    justify-content: space-around;
    width: 100%;
  }

  .sidebar-menu-container a {
    margin-bottom: 0;
    flex-direction: column;
  }

  .text {
    display: none;
  }

  h3 {
    display: none;
  }

  .hide-on-mobile {
    display: none;
  }
}
</style>
