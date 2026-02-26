<template>
  <aside class="sidebar window">
    <div class="title-bar">
      <div class="title-bar-text">{{ props.title }}</div>
      <div class="title-bar-controls">
        <button aria-label="Close"></button>
      </div>
    </div>

    <div class="window-body sidebar-menu-container">
      <slot></slot>
    </div>
  </aside>
</template>

<script setup lang="ts">
interface Props {
  title: string
}

const props = withDefaults(defineProps<Props>(), {
  title: '200px',
})
</script>

<style scoped></style>
