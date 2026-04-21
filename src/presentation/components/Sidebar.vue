<template>
  <aside class="sidebar window">
    <div class="title-bar">
      <div class="title-bar-text">NaN IDLE</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body sidebar-menu-container">
      <ul class="tree-view">
        <li>
          <RouterLink to="/" exact-active-class="is-active">
            <v-icon name="fa-bolt" />
            <span class="text">Training</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            v-if="mainStore.isUnlocked(UnlockableEnum.FightBoss)"
            to="/fight-boss"
            exact-active-class="is-active"
          >
            <v-icon name="ri-sword-fill" />
            <span class="text">Fight Boss</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            v-if="mainStore.isUnlocked(UnlockableEnum.SpendXP)"
            to="/spend-xp"
            exact-active-class="is-active"
          >
            <v-icon name="ri-bubble-chart-fill" />
            <span class="text">Spend XP</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            v-if="mainStore.isUnlocked(UnlockableEnum.Adventure)"
            to="/adventure"
            exact-active-class="is-active"
          >
            <v-icon name="fa-map" />
            <span class="text">Adventure</span>
          </RouterLink>
        </li>
        <li>
          <RouterLink
            v-if="mainStore.isUnlocked(UnlockableEnum.Inventory)"
            to="/inventory"
            exact-active-class="is-active"
          >
            <v-icon name="fa-bolt" />
            <span class="text">Inventory</span>
          </RouterLink>
        </li>
      </ul>
      <button
        v-if="isLocalhost"
        @click="resetData"
        class="hide-on-mobile"
        style="margin-top: 20px; width: 100%"
      >
        Reset Data
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { computed } from 'vue'
import { useMainStore } from '@/presentation/stores/mainStore'
import { UnlockableEnum } from '@/domain/enums'

const isLocalhost = computed(() => {
  return window.location.hostname === 'localhost'
})

const mainStore = useMainStore()

const resetData = () => {
  mainStore.resetGame()
}
</script>

<style scoped>
.sidebar {
  position: fixed;
  top: 0;
  right: 0;
  width: 150px;
  height: 100%;
  overflow-y: auto;
  z-index: 200;
  margin: 0;
}

.sidebar-menu-container {
  display: flex;
  flex-direction: column;
  padding: 10px;
}

.tree-view {
  margin: 0;
  padding: 2px;
}

.tree-view li {
  margin-top: 5px;
  margin-bottom: 5px;
  list-style: none; /* Hide bullets if they appear */
}

.tree-view a {
  display: flex;
  align-items: center;
  gap: 8px;
  text-decoration: none;
  color: inherit;
  padding: 4px;
}

.tree-view a.is-active {
  background-color: #000080;
  color: white;
}

@media (max-width: 768px) {
  .sidebar {
    top: auto;
    bottom: 0;
    width: 100%;
    height: auto;
    flex-direction: row;
    padding: 0;
    /* Override window class borders on mobile */
    box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.2) !important;
    border: none !important;
  }

  /* Hide the window title bar on mobile since it takes too much vertical space */
  .title-bar {
    display: none !important;
  }

  .sidebar-menu-container {
    flex-direction: row;
    width: 100%;
    margin: 0 !important;
    padding: 5px 0 !important;
  }

  .tree-view {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    padding: 0;
    margin: 0;
    /* Remove the white background and inset shadow of the tree-view on mobile */
    background: transparent !important;
    border: none !important;
    box-shadow: none !important;
  }

  .tree-view li {
    margin: 0;
  }

  .tree-view a {
    flex-direction: column;
    padding: 5px;
    align-items: center;
    border-radius: 4px;
  }

  .tree-view a.is-active {
    background-color: rgba(0, 0, 128, 0.1) !important;
    color: #000080 !important;
    font-weight: bold;
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
