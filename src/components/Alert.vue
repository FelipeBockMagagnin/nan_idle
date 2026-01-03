<template>
  <div class="alert-stack-container">
    <TransitionGroup name="fade" tag="div">
      <div v-for="alert in alerts" :key="alert.id" class="alert-container">
        <div class="alert-message">
          {{ alert.message }}
        </div>
      </div>
    </TransitionGroup>
  </div>
</template>

<script setup lang="ts">
import { alerts } from '../services/alertService'
</script>

<style scoped>
.alert-stack-container {
  position: fixed;
  top: 20px;
  right: 20px;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.alert-container {
  background-color: #4caf50; /* Green */
  color: white;
  padding: 15px;
  margin-bottom: 5px;
  border-radius: 5px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 300px; /* Or a max-width */
}

.alert-message {
  font-weight: bold;
}

/* Transition styles */
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}
</style>
